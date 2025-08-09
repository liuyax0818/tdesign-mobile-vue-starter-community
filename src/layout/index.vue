<script setup lang='ts'>
import LayoutBody from './components/layout-body/index.vue'
import LayoutFooter from './components/layout-footer/index.vue'

defineOptions({
  name: 'Layout',
})

const route = useRoute()

const showFooter = computed(() => {
  return route.meta?.showFooter ?? false
})
</script>

<template>
  <div class="layout-wrapper">
    <LayoutBody :class="[showFooter && 'pb-[56px]']" />
    <LayoutFooter v-if="showFooter" />
  </div>
</template>

<style lang='scss' scoped>
.layout-wrapper {
  position: relative;
  height: 100vh;
  background-color: var(--tmv-bg-color);
}
</style>
