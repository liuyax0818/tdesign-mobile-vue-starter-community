<script setup lang="ts">
import dayjs from 'dayjs'
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
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
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

  setTimeout(() => {
    const replies = [
      '收到，谢谢回复',
      '明白了',
      '好的，我会处理的',
      '这个问题我需要再考虑一下',
      '稍等，我查一下资料',
    ]
    const randomReply = replies[Math.floor(Math.random() * replies.length)]

    const newMsg = {
      id: Date.now(),
      contactId: contactId.value,
      sender: 'contact' as const,
      content: randomReply,
      time: dayjs().format('HH:mm'),
      unread: false,
    }

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
  <div class="chat-page h-full overflow-y-scroll">
    <Banner :title="contact?.name ?? '未知联系人'" />

    <div ref="chatContainer" class="chat-container">
      <div class="relative">
        <transition-group name="message" tag="div">
          <div v-for="msg in chatMessages" :key="msg.id" class="px-1 py-3">
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
</template>

<style scoped>
.chat-page {
  display: flex;
  flex-direction: column;
  background-color: var(--ep-chat-container-bg-default);
}

.chat-container {
  flex: 1;
  padding-bottom: 70px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.input-area {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  z-index: 1000;
}

.input-container {
  width: 100%;
  min-height: 64px;
  display: flex;
  align-items: flex-end;
  padding: 12px 16px;
  border-top: 0.5px solid #e7e7e7;
  background: #ffffff;
  box-sizing: border-box;
}

.input-wrapper {
  flex: 1;
  margin-right: 12px;
}

.message-input {
  width: 100%;
  min-height: 40px;
  max-height: 200px;
  border-radius: 20px;
  border: none;
  background: #f5f5f5;
  padding: 12px 16px;
  resize: none;
  overflow-y: hidden;
  outline: none;
  font-size: 16px;
  line-height: 20px;
  transition: all 0.2s;
  box-sizing: border-box;
}

.message-input:focus {
  background: #f0f0f0;
  overflow-y: auto;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.message-input::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.message-input {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
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

@media (max-width: 480px) {
  .input-container {
    min-height: 56px;
    padding: 8px 12px;
  }

  .message-input {
    min-height: 36px;
    padding: 8px 12px;
    font-size: 14px;
    line-height: 18px;
    max-height: 150px;
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
