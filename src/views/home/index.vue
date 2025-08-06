<script setup lang='ts'>
import { get, post } from '@/utils/request'
import { useHomeHook } from './hooks'

defineOptions({
  name: 'Home',
})

const {
  reHandleLogin,
  reHandleGetUserInfo,
  reHandleGetUserList,
} = useHomeHook()

async function handleLogin(username: string, password: string) {
  try {
    const result = await post('/login', { username, password })
    console.log('登录成功:', result)
    return result
  }
  catch (error) {
    console.error('登录失败:', error)
    throw error
  }
}

async function handleGetUserInfo() {
  try {
    const result = await get('/getUserInfo')
    console.log('获取用户信息成功:', result)
    return result
  }
  catch (error) {
    console.error('获取用户信息失败:', error)
    throw error
  }
}

async function handleGetUserList() {
  try {
    const result = await get('/getUserList', { curr: 10, size: 20 })
    console.log('获取用户列表成功:', result)
    return result
  }
  catch (error) {
    console.error('获取用户列表失败:', error)
    throw error
  }
}
</script>

<template>
  <div>
    <div class="flex gap-2 flex-wrap">
      <t-button @click="handleGetUserInfo">
        获取用户信息
      </t-button>
      <t-button @click="handleGetUserList">
        获取用户列表
      </t-button>
      <t-button @click="handleLogin('菜虚鲲', 'ctrl')">
        登录测试 - 正确密码
      </t-button>
      <t-button @click="handleLogin('菜虚鲲', 'wrong')">
        登录测试 - 错误密码
      </t-button>
    </div>

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
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>
