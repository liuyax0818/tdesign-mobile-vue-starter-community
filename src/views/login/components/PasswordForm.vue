<script setup lang='ts'>
import { removeWhitespace } from '@/utils/value'

const account = defineModel<string>('account')
const password = defineModel<string>('password')

function onAccChange(val: string) {
  account.value = removeWhitespace(val)
}
function onPwdChange(val: string) {
  password.value = removeWhitespace(val)
}
</script>

<template>
  <div>
    <t-input
      v-model="account"
      placeholder="请输入手机号/邮箱"
      :maxlength="20"
      label="账号"
      @change="onAccChange"
    />
    <t-input
      v-model="password"
      label="密码"
      placeholder="请输入密码"
      type="password"
      :maxlength="20"
      @change="onPwdChange"
    >
      <template #suffixIcon>
        <BrowseOffIcon />
      </template>
    </t-input>
  </div>
</template>

<style lang='scss' scoped>
:deep() {
  --td-input-bg-color: transparent;
  --td-input-vertical-padding: 16px 0;
  --td-input-border-left-space: 0;
  .t-input__label {
    width: 80px;
  }
}
</style>
