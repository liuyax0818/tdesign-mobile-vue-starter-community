<script setup lang="ts">
import { ArrowLeftIcon } from 'tdesign-icons-vue-next'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router/auto'
import { useMessageStore } from '@/store/messages'

const route = useRoute('/message/[id]/')
const router = useRouter()
const messageStore = useMessageStore()

const contactId = computed(() => {
  const params = route.params as { id: string }
  return Number(params.id) || 0
})
const contact = computed(() => messageStore.contacts.find(c => c.id === contactId.value))
const chatMessages = computed(() => messageStore.getChatMessages(contactId.value))

const currentTime = ref('')
function updateTime() {
  const now = new Date()
  currentTime.value = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
}

let timer: ReturnType<typeof setInterval>
const newMessage = ref('')
const chatContainer = ref<HTMLElement | null>(null)
const showInputArea = ref(true)
const hasText = ref(false) // 输入框是否有文字

// 监听输入框变化
watch(newMessage, (value) => {
  hasText.value = value.trim().length > 0
})

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 60000)
  scrollToBottom()
  messageStore.markAsRead(contactId.value)
})

onBeforeUnmount(() => clearInterval(timer))

function scrollToBottom() {
  setTimeout(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  }, 0)
}

function sendMessage() {
  const content = newMessage.value.trim()
  if (!content)
    return

  messageStore.sendMessage(contactId.value, content)
  newMessage.value = ''
  scrollToBottom()

  // 模拟回复
  setTimeout(() => {
    const replies = [
      '收到，谢谢回复',
      '明白了',
      '好的，我会处理的',
      '这个问题我需要再考虑一下',
      '稍等，我查一下资料',
    ]
    const randomReply = replies[Math.floor(Math.random() * replies.length)]

    const now = new Date()
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`

    const newMsg = {
      id: Date.now(),
      contactId: contactId.value,
      sender: 'contact' as const,
      content: randomReply,
      time: timeStr,
      unread: false, // 当前对话页面，自动设为已读
    }

    // 使用新的addMessage方法添加消息
    messageStore.addMessage(newMsg, true)

    scrollToBottom()
  }, 1000 + Math.random() * 2000)
}

function formatTime(timeString: string) {
  try {
    const [hours, minutes] = timeString.split(':')
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`
  }
  catch {
    return '00:00'
  }
}
</script>

<template>
  <div class="chat-page">
    <t-navbar :title="contact?.name || '未知联系人'" class="fixed-navbar">
      <template #left>
        <t-button variant="text" @click="router.go(-1)">
          <template #icon>
            <ArrowLeftIcon />
          </template>
        </t-button>
      </template>
    </t-navbar>

    <div ref="chatContainer" class="chat-container">
      <div class="message-list">
        <transition-group name="message" tag="div">
          <div v-for="msg in chatMessages" :key="msg.id" class="message-wrapper">
            <div class="message-item" :class="{ 'message-me': msg.sender === 'me' }">
              <t-avatar
                v-if="msg.sender === 'contact'"
                :image="messageStore.getContactAvatar(contactId)"
                size="40px"
                class="message-avatar"
              />

              <div class="message-content">
                <div class="message-bubble" :class="{ 'bubble-me': msg.sender === 'me' }">
                  {{ msg.content }}
                </div>
                <div class="message-time" :class="{ 'time-me': msg.sender === 'me' }">
                  {{ formatTime(msg.time) }}
                </div>
              </div>

              <t-avatar
                v-if="msg.sender === 'me'"
                :image="messageStore.myAvatar"
                size="40px"
                class="message-avatar message-avatar-me"
              />
            </div>
          </div>
        </transition-group>
      </div>
    </div>

    <transition name="fade">
      <div v-if="showInputArea" class="input-area">
        <t-input
          v-model="newMessage"
          placeholder="请输入"
          class="message-input"
          @keyup.enter="hasText && sendMessage()"
        />
        <button
          class="send-button"
          :class="{ active: hasText }"
          :disabled="!hasText"
          @click="sendMessage"
        >
          发送
        </button>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.chat-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}

.fixed-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.chat-container {
  flex: 1;
  padding-top: 56px;
  padding-bottom: 70px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.message-list {
  position: relative;
}

.message-wrapper {
  padding: 4px 12px;
}

.message-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
}

.message-me {
  justify-content: flex-end;
}

.message-avatar {
  flex-shrink: 0;
  margin-right: 8px;
  margin-top: 2px;
}

.message-avatar-me {
  margin-left: 8px;
  margin-right: 0;
}

.message-content {
  max-width: calc(80% - 48px);
  display: flex;
  flex-direction: column;
}

.message-me .message-content {
  align-items: flex-end;
}

.message-bubble {
  padding: 10px 14px;
  border-radius: 18px;
  background-color: white;
  color: #333;
  line-height: 1.4;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: 4px;
  max-width: 100%;
  word-break: break-word;
}

.bubble-me {
  background-color: #d9e1ff;
  color: black;
}

.message-time {
  font-size: 11px;
  color: #999;
  padding: 0 2px;
}

.time-me {
  text-align: right;
}

.input-area {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  padding: 8px 12px;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 1000;
}

.message-input {
  flex: 1;
}

.send-button {
  min-width: 72px;
  height: 40px;
  padding: 0 16px;
  border-radius: 20px;
  border: none;
  background-color: #b5c7ff;
  color: white;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
}

.send-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: #b5c7ff;
}

.send-button.active {
  background-color: #7b9aff;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.message-move,
.message-enter-active,
.message-leave-active {
  transition: all 0.5s ease;
}

.message-enter-from,
.message-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.message-leave-active {
  position: absolute;
}

@media (max-width: 480px) {
  .message-content {
    max-width: calc(85% - 48px);
  }

  .message-bubble {
    padding: 8px 12px;
    font-size: 15px;
  }

  .message-time {
    font-size: 10px;
  }

  .send-button {
    min-width: 60px;
    height: 36px;
    padding: 0 12px;
    font-size: 14px;
  }
}
</style>
