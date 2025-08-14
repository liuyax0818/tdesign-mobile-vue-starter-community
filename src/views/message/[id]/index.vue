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
  padding: 8px 12px;
  border-top: 1px solid var(--ep-chat-border-default);
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 1000;
}

.send-button {
  min-width: 72px;
  height: 40px;
  padding: 0 16px;
  border-radius: 20px;
  border: none;
  background-color: var(--ep-chat-btn-bg-default);
  color: white;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--ep-transition-duration-default) ease;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &.active {
    background-color: var(--ep-chat-btn-bg-active);
  }
}

@media (max-width: 480px) {
  .send-button {
    min-width: 60px;
    height: 36px;
    padding: 0 12px;
    font-size: 14px;
  }
}
</style>
