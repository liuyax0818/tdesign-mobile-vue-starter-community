<script setup lang='ts'>
import type { Component } from 'vue'
import { LogoQqFilledIcon, LogoWechatStrokeFilledIcon, LogoWecomIcon } from 'tdesign-icons-vue-next'

function buildIcon(icon: Component, size = '18px') {
  return () => h(icon, { size })
}
const value = defineModel<number>()
</script>

<template>
  <div class="flex items-center gap-3">
    <div class="text-xs text-[#00000099]">
      其他方式
    </div>
    <t-button
      v-if="value === 1"
      shape="round"
      variant="outline"
      class="w-[110px]"
      @click="value = 2"
    >
      验证码登录
    </t-button>
    <t-button
      v-if="value === 2"
      shape="round"
      variant="outline"
      class="w-[110px]"
      @click="value = 1"
    >
      密码登录
    </t-button>
    <t-button shape="circle" variant="outline" :icon="buildIcon(LogoWechatStrokeFilledIcon)" />
    <t-button shape="circle" variant="outline" :icon="buildIcon(LogoQqFilledIcon)" />
    <t-button shape="circle" variant="outline" :icon="buildIcon(LogoWecomIcon)" />
  </div>
</template>

<style lang='scss' scoped>
:deep() {
  --td-button-medium-font-size: 14px;
}
</style>
