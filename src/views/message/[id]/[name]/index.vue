<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Footer from './components/Footer.vue'
import Message from './components/Message.vue'
import TimeBar from './components/TimeBar.vue'

import { useChatHook } from './hooks'

const { t } = useI18n()

const {
  userInfo,
  footerRef,
  messageList,
  chatContainerRef,
  sendMessage,
  buildMessageList,
} = useChatHook()

onMounted(() => {
  buildMessageList()
})
</script>

<template>
  <div class="chat-page h-full">
    <Banner :title="userInfo?.name ?? t('pageChat.unknown')" />

    <div ref="chatContainerRef" class="chat-container px-[12px]">
      <div
        v-for="(item) in messageList"
        :key="item.id"
      >
        <TimeBar
          v-if="item.isTime" :time="item.time"
        />
        <Message
          v-else
          :avatar="item.userAvatar"
          :content="item.content"
          :position="item.me ? 'right' : 'left' "
          :time="item.time"
        />
      </div>
    </div>

    <Footer ref="footerRef" @send="sendMessage" />
  </div>
</template>

<style scoped>
.chat-page {
  background-color: #fff;
  display: flex;
  flex-direction: column;
}

.chat-container {
  flex: 1;
  overflow-y: auto;
  /* 添加底部内边距，如不添加，底部输入框改为fixed后会有部分内容被阻挡 */
  padding-bottom: 70px;
}
</style>
