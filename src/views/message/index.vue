<script setup lang="ts">
import MessageItem from './components/MessageItem.vue'
import { useMessageHook } from './hooks'

const { msgList, goToChat, getMsgList } = useMessageHook()

onMounted(() => {
  getMsgList()
})
</script>

<route lang="json5">
{
  meta: {
    title: '消息',
    showFooter: true
  }
}
</route>

<template>
  <div class="page-container h-full overflow-y-auto">
    <Banner title="全部消息" func="menu" />
    <MessageItem
      v-for="item in msgList"
      :key="item.id"
      :title="item.title"
      :sub="item.content"
      :avatar="item.avatar"
      :count="item.count"
      @click="goToChat(item.id, item.title)"
    />
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  background-color: #f7f8fa;
}
</style>
