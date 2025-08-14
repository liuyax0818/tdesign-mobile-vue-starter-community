<script setup lang='ts'>
defineOptions({
  name: 'Message',
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
  <div>
    <Banner func="back" title="全部消息" />
    <div>消息</div>
  </div>
</template>

<style lang='scss' scoped>

</style>
