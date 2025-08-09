<script setup lang='ts'>
defineOptions({
  name: 'LayoutBody',
})
</script>

<template>
  <section class="layout-body">
    <router-view />
  </section>
</template>

<style lang='scss' scoped>
.layout-body {
  height: 100vh;
  background-color: var(--tmv-body-bg-color);
}
</style>
