<script setup lang='ts'>
import type { FooterMenuProp } from './types'

defineProps<FooterMenuProp & { active: boolean }>()
</script>

<template>
  <div class="footer-menu flex items-center justify-center">
    <div class="flex flex-col items-center" :class="[active && 'active']">
      <t-badge :count="badge ?? 0" :offset="[0, 5]" class="text-[20px]">
        <component :is="icon" />
      </t-badge>

      <div class="text-[10px]">
        {{ label }}
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.footer-menu {
  height: 40px;
  flex: 1;
  color: #000;

  .active {
    width: 100%;
    color: #0052d9;
    opacity: 1;
    border-radius: 999px;
    background-color: #f2f3ff;
    transition: all 0.3s;
  }
}

:deep(.t-badge--basic) {
  font-weight: 400;
}
</style>
