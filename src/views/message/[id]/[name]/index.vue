<script setup lang="ts">
import Footer from './components/Footer.vue'
import Message from './components/Message.vue'
import TimeBar from './components/TimeBar.vue'

import { useChatHook } from './hooks'

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
    <Banner :title="userInfo?.name ?? '未知联系人'" />

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
}
</style>
