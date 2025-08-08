<script setup lang='ts'>
import { useHomeHook } from './hooks'

defineOptions({
  name: 'Home',
})

const {
  reHandleLogin,
  reHandleGetUserInfo,
  reHandleGetUserList,
  reHandleClearToken,
} = useHomeHook()
</script>

<template>
  <div>
    <div class="mt-2 flex gap-2 flex-wrap">
      <t-button theme="primary" @click="reHandleGetUserInfo">
        获取用户信息
      </t-button>
      <t-button theme="primary" @click="reHandleGetUserList">
        获取用户列表
      </t-button>
      <t-button theme="primary" @click="reHandleLogin('菜虚鲲', 'ctrl')">
        登录测试 - 正确密码
      </t-button>
      <t-button theme="primary" @click="reHandleLogin('菜虚鲲', 'wrong')">
        登录测试 - 错误密码
      </t-button>
      <t-button theme="danger" @click="reHandleClearToken">
        清除Token
      </t-button>
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>
