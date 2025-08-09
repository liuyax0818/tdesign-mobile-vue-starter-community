import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<{
    name?: string
    bio?: string
    location?: string
    avatar?: string
  } | null>(null)

  const isAuthenticated = ref(false)

  const login = (userData: any) => {
    user.value = userData
    isAuthenticated.value = true
  }

  const logout = () => {
    user.value = null
    isAuthenticated.value = false
  }

  return { user, isAuthenticated, login, logout }
})
