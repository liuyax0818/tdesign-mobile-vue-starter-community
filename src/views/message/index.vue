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
  }

  :deep(.t-cell__note) {
    color: #333;
    font-size: 12px;
    margin-left: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    vertical-align: bottom;

    /* 默认宽度（大屏幕） */
    max-width: 35ch;
  }
}

/* 响应式断点控制 */
@media (max-width: 1024px) {
  .message-cell :deep(.t-cell__note) {
    max-width: 25ch;
  }
}

@media (max-width: 768px) {
  .message-cell :deep(.t-cell__note) {
    max-width: 15ch;
  }
}

@media (max-width: 414px) {
  .message-cell :deep(.t-cell__note) {
    max-width: 12ch;
  }
}

@media (max-width: 375px) {
  .message-cell :deep(.t-cell__note) {
    max-width: 8ch;
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
