<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDrawerStore } from '@/store/drawer'
import { useMessageStore } from '@/store/messages'

const router = useRouter()
const { open: openDrawer } = useDrawerStore()
const messageStore = useMessageStore()

// 获取当前时间
const currentTime = ref('')
function updateTime() {
  const now = new Date()
  currentTime.value = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
}

let timer: ReturnType<typeof setInterval>

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 60000)
  messageStore.preloadAvatars()
})

onBeforeUnmount(() => {
  clearInterval(timer)
})

function navigateToChat(contactId: number) {
  messageStore.markAsRead(contactId)
  router.push(`/message/${contactId}/`)
}

// 按视觉宽度截断文本（10个中文字符的等宽长度）
function truncateByWidth(text: string): string {
  if (!text)
    return ''

  // 定义中文字符宽度为2，其他字符宽度为1
  let totalWidth = 0
  let result = ''
  const maxWidth = 20 // 10个中文字符的宽度

  for (const char of text) {
    // 判断是否为中文字符（包括中文标点）
    const charWidth = /[\u4E00-\u9FA5]/.test(char) ? 2 : 1

    if (totalWidth + charWidth > maxWidth) {
      return `${result}...`
    }

    result += char
    totalWidth += charWidth
  }

  return text
}
</script>

<template>
  <t-navbar title="消息列表" class="fixed-navbar">
    <template #left>
      <div class="menu-btn" @click="openDrawer">
        <div class="menu-line" />
        <div class="menu-line" />
        <div class="menu-line" />
      </div>
    </template>
  </t-navbar>

  <div class="page-container">
    <div class="time-display">
      {{ currentTime }}
    </div>

    <div class="section-title">
      全部消息
    </div>

    <t-cell-group>
      <t-cell
        v-for="contact in messageStore.contacts"
        :key="contact.id"
        :title="contact.name"
        :note="truncateByWidth(contact.lastMessage)"
        class="message-cell"
        @click="navigateToChat(contact.id)"
      >
        <template #left-icon>
          <Avatar :src="contact.avatar" :alt="contact.name" size="36px" />
        </template>
        <template #right-icon>
          <div class="message-right">
            <span class="message-time">{{ contact.lastMessageTime }}</span>
            <t-badge v-if="contact.unread" count=" " dot />
          </div>
        </template>
      </t-cell>
    </t-cell-group>
  </div>

  <t-tab-bar default-value="Messages" class="bottom-tab-bar">
    <t-tab-bar-item name="Home" @click="router.push('/')">
      <template #icon>
        <t-icon name="home" />
      </template>
      首页
    </t-tab-bar-item>
    <t-tab-bar-item name="Messages" @click="router.push('/messages')">
      <template #icon>
        <t-badge :count="messageStore.unreadCount" :offset="[6, -2]">
          <t-icon name="mail" />
        </t-badge>
      </template>
      消息
    </t-tab-bar-item>
    <t-tab-bar-item name="Profile" @click="router.push('/profile')">
      <template #icon>
        <t-icon name="user" />
      </template>
      我的
    </t-tab-bar-item>
  </t-tab-bar>
</template>

<style scoped>
.fixed-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.page-container {
  padding-top: 56px;
  padding-bottom: 80px;
  background-color: #f7f8fa;
  min-height: 100vh;
}

.time-display {
  padding: 12px 16px;
  color: #999;
  font-size: 12px;
  text-align: center;
}

.section-title {
  padding: 8px 16px;
  font-weight: bold;
  font-size: 14px;
  background-color: #f7f8fa;
}

.message-cell {
  align-items: center;
  padding: 8px 16px;
}

.message-cell :deep(.t-cell__title) {
  font-size: 14px;
  font-weight: normal;
  margin-left: 8px;
}

.message-cell :deep(.t-cell__note) {
  color: #333;
  font-size: 12px;
  margin-left: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
}

.message-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.message-time {
  color: #999;
  font-size: 10px;
}

.menu-btn {
  margin-left: 12px;
  width: 20px;
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}

.menu-line {
  width: 100%;
  height: 2px;
  background-color: currentColor;
}

.bottom-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

.t-tab-bar-item--active {
  color: var(--td-brand-color);
}
</style>
