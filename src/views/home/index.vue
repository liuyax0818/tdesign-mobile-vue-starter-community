<script setup lang='ts'>
import { useHomeHook } from './hooks'

defineOptions({
  name: 'Home',
})

const {
  handleLogin,
  handleGetUserInfo,
  handleGetUserList,
  handleClearToken,
} = useHomeHook()
</script>

<template>
  <div>
    <div class="mt-2 flex gap-2 flex-wrap">
      <t-button theme="primary" @click="handleGetUserInfo">
        获取用户信息
      </t-button>
      <t-button theme="primary" @click="handleGetUserList">
        获取用户列表
      </t-button>
      <t-button theme="primary" @click="handleLogin('菜虚鲲', 'ctrl')">
        登录测试 - 正确密码
      </t-button>
      <t-button theme="primary" @click="handleLogin('菜虚鲲', 'wrong')">
        登录测试 - 错误密码
      </t-button>
      <t-button theme="danger" @click="handleClearToken">
        清除Token
      </t-button>
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>
