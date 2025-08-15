<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useMessageStore } from '@/store/messages'

const route = useRoute()
const messageStore = useMessageStore()

const contactId = computed(() => {
  const params = route.params as { id: string }
  return Number(params!.id) || 0
})
const contact = computed(() => messageStore.contacts.find(c => c.id === contactId.value))
const chatMessages = computed(() => messageStore.getChatMessages(contactId.value))

const newMessage = ref('')
const chatContainer = ref<HTMLElement | null>(null)
const showInputArea = ref(true)
const hasText = computed(() => newMessage.value.trim().length > 0)

onMounted(() => {
  scrollToBottom()
  messageStore.markAsRead(contactId.value)
})

function scrollToBottom() {
  setTimeout(() => {
    chatContainer.value?.scrollTo({
      top: chatContainer.value.scrollHeight,
      behavior: 'smooth',
    })
  }, 0)
}

function handleEnter(e: KeyboardEvent) {
  if (!e.shiftKey && hasText.value) {
    e.preventDefault()
    sendMessage()
  }
}

function sendMessage() {
  const content = newMessage.value.trim()
  if (!content)
    return

  messageStore.sendMessage(contactId.value, content)
  newMessage.value = ''
  scrollToBottom()

  // 模拟自动回复
  setTimeout(() => {
    const replies = [
      '收到，谢谢回复',
      '明白了',
      '好的，我会处理的',
      '这个问题我需要再考虑一下',
      '稍等，我查一下资料',
    ]
    const randomReply = replies[Math.floor(Math.random() * replies.length)]

    messageStore.addMessage({
      id: Date.now(),
      contactId: contactId.value,
      sender: 'contact',
      content: randomReply,
      time: dayjs().format('HH:mm'),
      unread: false,
    }, true)

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
  <div class="chat-app">
    <Banner :title="contact?.name ?? '未知联系人'" />

    <div class="chat-layout">
      <!-- 消息区域 -->
      <div ref="chatContainer" class="messages-area">
        <div class="messages-list">
          <transition-group name="message">
            <div
              v-for="msg in chatMessages"
              :key="msg.id"
              class="message-item"
            >
              <MessageBubble
                :sender="msg.sender"
                :content="msg.content"
                :time="formatTime(msg.time)"
                :avatar="msg.sender === 'me'
                  ? messageStore.myAvatar
                  : messageStore.getContactAvatar(contactId)"
                size="40px"
              />
            </div>
          </transition-group>
        </div>
      </div>

      <!-- 输入区域 -->
      <transition name="fade">
        <div v-if="showInputArea" class="input-area">
          <div class="input-container">
            <div class="input-wrapper">
              <textarea
                v-model="newMessage"
                placeholder="请输入"
                class="message-input"
                rows="1"
                @keydown.enter="handleEnter"
              />
            </div>
            <button
              class="send-button"
              :class="{ active: hasText }"
              :disabled="!hasText"
              @click="sendMessage"
            >
              发送
            </button>
          </div>
          <div class="safe-area-bottom" />
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
/* 基础布局 */
.chat-app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--ep-chat-container-bg-default);
}

.chat-layout {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

/* 消息区域 */
.messages-area {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 12px 16px 8px;
}

.messages-list {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.message-item {
  padding: 4px 0;
}

/* 输入区域 */
.input-area {
  width: 100%;
  background: white;
  border-top: 0.5px solid #e7e7e7;
}

.input-container {
  display: flex;
  align-items: flex-end;
  padding: 12px 16px;
  gap: 12px;
}

.input-wrapper {
  flex: 1;
}

.message-input {
  width: 100%;
  min-height: 40px;
  max-height: 120px;
  height: auto;
  border-radius: 20px;
  border: none;
  background: #f5f5f5;
  padding: 12px 16px;
  resize: none;
  overflow-y: hidden;
  outline: none;
  font-size: 16px;
  line-height: 1.5;
  transition: all 0.2s;
  box-sizing: border-box;
}

.message-input:focus {
  background: #f0f0f0;
}

.send-button {
  width: 64px;
  height: 40px;
  border-radius: 20px;
  border: none;
  background-color: #b5c7ff;
  color: white;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  flex-shrink: 0;
  margin-bottom: 4px;
}

.send-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.send-button.active {
  background-color: var(--ep-chat-btn-bg-active);
}

.safe-area-bottom {
  height: calc(24px + env(safe-area-inset-bottom));
  width: 100%;
  background: white;
}

/* 过渡动画 */
.message-move,
.message-enter-active,
.message-leave-active {
  transition: all 0.3s ease;
}
.message-enter-from,
.message-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.message-leave-active {
  position: absolute;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 移动端适配 */
@media (max-width: 480px) {
  .messages-area {
    padding: 8px 12px 4px;
  }

  .input-container {
    padding: 8px 12px;
  }

  .message-input {
    min-height: 36px;
    padding: 8px 12px;
    font-size: 14px;
  }

  .send-button {
    width: 56px;
    height: 36px;
    font-size: 14px;
  }

  .safe-area-bottom {
    height: calc(20px + env(safe-area-inset-bottom));
  }
}
</style>
