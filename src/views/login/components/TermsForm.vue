<script setup lang='ts'>
const value = defineModel<boolean>()
</script>

<template>
  <t-radio v-model="value" borderless allow-uncheck label="同意《协议条款》" />
</template>

<style lang='scss' scoped>
:deep() {
  --td-radio-vertical-padding: 0;
  --td-radio-font-size: 12px;
  --td-radio-icon-size: 16px;
  --td-radio-label-line-height: 16px;

  .t-radio__icon--left {
    margin-right: 4px;
  }
}
</style>
