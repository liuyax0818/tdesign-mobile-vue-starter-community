<script setup lang="ts">
import { useNow } from '@vueuse/core'
import dayjs from 'dayjs'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/store/messages'

const router = useRouter()
const messageStore = useMessageStore()
const screenWidth = ref(window.innerWidth)

// 计算属性，根据屏幕宽度返回最大字符数
const maxChars = computed(() => {
  // 根据不同的屏幕宽度区间返回不同的字符数
  if (screenWidth.value < 375)
    return 8 // 小屏手机
  if (screenWidth.value < 414)
    return 12 // 中等屏幕手机
  if (screenWidth.value < 768)
    return 15 // 大屏手机
  if (screenWidth.value < 1024)
    return 25 // 平板
  return 35 // 电脑大屏
})

// 获取当前时间
const now = useNow()

// 更新屏幕宽度
function updateScreenSize() {
  screenWidth.value = window.innerWidth
}

onMounted(() => {
  messageStore.preloadAvatars()
  window.addEventListener('resize', updateScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize)
})

function navigateToChat(contactId: number) {
  messageStore.markAsRead(contactId)
  router.push(`/message/${contactId}/`)
}
</script>

<route lang="json5">
{
  meta: {
    showFooter: true
  }
}
</route>

<template>
  <div class="page-container h-full overflow-y-scroll">
    <Banner title="消息列表" func="menu" />

    <div class="time-display">
      {{ dayjs(now).format('HH:mm') }}
    </div>

    <div class="section-title">
      全部消息
    </div>

    <t-cell-group>
      <t-cell
        v-for="contact in messageStore.contacts"
        :key="contact.id"
        :title="contact.name"
        :note="contact.lastMessage"
        class="message-cell"
        @click="navigateToChat(contact.id)"
      >
        <template #left-icon>
          <Avatar :src="contact.avatar.src" :alt="contact.avatar.alt" size="36px" />
        </template>
        <template #right-icon>
          <div class="message-right">
            <span class="message-time">{{ contact.lastMessageTime }}</span>
            <t-badge
              v-if="typeof contact.unread === 'number' && contact.unread > 0"
              :count="contact.unread"
            />
            <t-badge
              v-else-if="contact.unread"
              count=" "
              dot
            />
          </div>
        </template>
      </t-cell>
    </t-cell-group>
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  background-color: #f7f8fa;
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

  :deep(.t-cell__title) {
    font-size: 14px;
    font-weight: normal;
    margin-left: 8px;
  }

  :deep(.t-cell__note) {
    color: #333;
    font-size: 12px;
    margin-left: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: calc(v-bind(maxChars) * 1ch); /* 使用ch单位，1ch大约等于一个中文字符宽度 */
    display: inline-block;
    vertical-align: bottom;
  }
}

.message-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;

  .t-badge {
    :deep(.t-badge--count) {
      min-width: 16px;
      height: 16px;
      padding: 0 4px;
      font-size: 10px;
      line-height: 16px;
    }
  }
}

.message-time {
  color: #999;
  font-size: 10px;
}
</style>
