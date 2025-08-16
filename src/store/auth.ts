import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // 认证令牌
  const token = ref<string | null>(null)

  // 当前用户ID
  const userId = ref<string | null>(null)

  // 是否已认证
  const isAuthenticated = ref(false)

  // 加载状态
  const isLoading = ref(false)

  // 模拟登录函数
  const login = async (credentials: { username: string, password: string }): Promise<boolean> => {
    try {
      isLoading.value = true

      // 模拟登录成功
      token.value = `mock-token-${Math.random().toString(36).substring(2, 15)}`
      // userId.value = `user-${credentials.username.toLowerCase()}`
      userId.value = 'user-1' // 使用固定用户ID进行演示
      isAuthenticated.value = true

      return true
    }
    catch (error) {
      console.error('登录失败:', error)
      return false
    }
    finally {
      isLoading.value = false
    }
  }

  // 清除认证信息
  const logout = () => {
    token.value = null
    userId.value = null
    isAuthenticated.value = false
  }

  // 切换登录状态(用于演示)
  const toggleLogin = async () => {
    if (isAuthenticated.value) {
      logout()
    }
    else {
      await login({ username: 'demo', password: 'demo123' })
    }
  }

  return {
    token,
    userId,
    isAuthenticated,
    isLoading,
    login,
    logout,
    toggleLogin,
  }
})
