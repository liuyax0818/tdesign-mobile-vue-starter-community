<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import MessageItem from './components/MessageItem.vue'
import { useMessageHook } from './hooks'

const { t } = useI18n()
const { msgList, goToChat, getMsgList } = useMessageHook()

onMounted(() => {
  getMsgList()
})
</script>

<route lang="json5">
{
  meta: {
    title: '消息',
    i18n: 'menus.message',
    showFooter: true
  }
}
</route>

<template>
  <div class="page-container h-full overflow-y-auto">
    <Banner :title="t('pageMessage.title')" func="menu" />
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
