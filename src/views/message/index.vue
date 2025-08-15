<script setup lang="ts">
import { useNow } from '@vueuse/core'
import dayjs from 'dayjs'
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/store/messages'

const router = useRouter()
const messageStore = useMessageStore()

// 获取当前时间
const now = useNow()

onMounted(() => {
  messageStore.preloadAvatars()
})

onUnmounted(() => {
  // 保留卸载钩子以备其他用途
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
    color: #000000;
  }

  :deep(.t-cell__note) {
    width: 251px; /* 固定宽度 */
    height: 22px;
    color: rgba(0, 0, 0, 0.6); /* #00000099 的 rgba 表示 */
    font-size: 14px;
    font-weight: 400;
    font-family:
      'PingFang SC',
      -apple-system,
      sans-serif; /* 添加字体回退 */
    line-height: 22px;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block; /* 改为块级元素 */
    margin-left: 8px;
    margin-top: 2px;
  }
}

/* 响应式调整 */
@media (max-width: 1024px) {
  .message-cell :deep(.t-cell__note) {
    width: 200px;
  }
}

@media (max-width: 768px) {
  .message-cell :deep(.t-cell__note) {
    width: 150px;
  }
}

@media (max-width: 414px) {
  .message-cell :deep(.t-cell__note) {
    width: 120px;
    font-size: 12px;
    line-height: 18px;
  }
}

@media (max-width: 375px) {
  .message-cell :deep(.t-cell__note) {
    width: 100px;
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
