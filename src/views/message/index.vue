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
        class="message-cell"
        @click="navigateToChat(contact.id)"
      >
        <template #left-icon>
          <Avatar :src="contact.avatar.src" :alt="contact.avatar.alt" size="36px" />
        </template>
        <template #title>
          <div class="message-content">
            <div class="contact-name">
              {{ contact.name }}
            </div>
            <div class="message-preview">
              {{ contact.lastMessage }}
            </div>
          </div>
        </template>
        <template #right-icon>
          <t-badge
            v-if="contact.unreadCount > 0"
            :count="contact.unreadCount"
            :max-count="99"
            :offset="[-4, 4]"
          />
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
  position: relative;

  :deep(.t-cell__title) {
    flex: 1;
    margin-left: 8px;
    overflow: hidden;
    min-width: 0;
  }

  .message-content {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .contact-name {
    font-size: 14px;
    font-weight: normal;
    color: #000000;
    line-height: 1.5;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .message-preview {
    color: rgba(0, 0, 0, 0.6);
    font-size: 14px;
    font-weight: 400;
    font-family:
      'PingFang SC',
      -apple-system,
      sans-serif;
    line-height: 22px;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 2px;
  }
}

.t-badge {
  :deep(.t-badge--count) {
    width: 16px;
    height: 16px;
    min-width: 16px;
    padding: 0;
    background-color: #ff4d4f;
    color: #ffffff;
    font-size: 10px;
    font-weight: 600;
    font-family:
      'PingFang SC',
      -apple-system,
      sans-serif;
    text-align: center;
    line-height: 16px;
    border-radius: 8px;
  }

  :deep(.t-badge--count.t-badge--count-large) {
    padding: 0 3px;
    width: auto;
  }
}

/* 响应式调整 */
@media (max-width: 414px) {
  .message-preview {
    font-size: 12px;
    line-height: 18px;
  }
}
</style>
