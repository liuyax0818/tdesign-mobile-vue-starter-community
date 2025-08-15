<script setup lang="ts">
import { useNow } from '@vueuse/core'
import dayjs from 'dayjs'
import { onMounted, onUnmounted, ref } from 'vue'
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
            <div class="message-preview-wrapper">
              <div class="message-preview">
                {{ contact.lastMessage }}
              </div>
            </div>
          </div>
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
  position: relative;

  :deep(.t-cell__title) {
    flex: 1;
    margin-left: 8px;
    overflow: hidden;
    min-width: 0; /* 添加这行确保flex容器能正确收缩 */
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

  .message-preview-wrapper {
    display: flex;
    position: relative;
    width: 100%;

    /* 为红点预留空间 */
    padding-right: 60px; /* 根据实际红点区域宽度调整 */
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
    width: 100%; /* 占据剩余空间 */
  }
}

.message-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  position: absolute;
  right: 16px; /* 与cell的padding-right一致 */
  top: 50%;
  transform: translateY(-50%);

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
  margin-right: 4px;
}

/* 响应式调整 */
@media (max-width: 1024px) {
  .message-preview-wrapper {
    padding-right: 50px;
  }
}

@media (max-width: 768px) {
  .message-preview-wrapper {
    padding-right: 40px;
  }
}

@media (max-width: 414px) {
  .message-preview {
    font-size: 12px;
    line-height: 18px;
  }
  .message-preview-wrapper {
    padding-right: 35px;
  }
}

@media (max-width: 375px) {
  .message-preview-wrapper {
    padding-right: 30px;
  }
}
</style>
