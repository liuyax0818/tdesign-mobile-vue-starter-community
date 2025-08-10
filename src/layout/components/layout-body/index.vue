<script setup lang='ts'>
defineOptions({
  name: 'LayoutBody',
})

defineProps<{
  hideHeader: boolean
  showFooter: boolean
}>()
</script>

<template>
  <section
    class="layout-body h-full"
    :class="[showFooter && 'pb-[56px]', !hideHeader && 'pt-[48px]']"
  >
    <router-view class="body-wrapper" />
  </section>
</template>

<style lang='scss' scoped>
.layout-body {
  overflow-y: scroll;
  background-color: var(--tmv-body-bg-color);
}
</style>
