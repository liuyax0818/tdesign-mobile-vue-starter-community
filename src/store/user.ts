import { defineStore } from 'pinia'
import { ref } from 'vue'

interface User {
  id: string
  name: string
  bio: string
  location: string
  avatar: string
  // 可扩展字段
  gender?: string
  birthday?: string
  website?: string
}

export const useUserStore = defineStore('user', () => {
  // 当前用户状态
  const currentUser = ref<User | null>(null)

  // 加载状态
  const isLoading = ref(false)

  // 模拟用户数据库
  const userDatabase: Record<string, User> = {
    'user-1': {
      id: 'user-1',
      name: '小小轩',
      bio: '天秤座',
      location: '深圳',
      avatar: '/avatars/me.jpg',
      gender: '男',
      birthday: '1990-10-01',
    },
    'user-2': {
      id: 'user-2',
      name: '测试用户',
      bio: '水瓶座',
      location: '北京',
      avatar: '/avatars/user1.jpg',
      gender: '女',
      birthday: '1995-01-20',
    },
  }

  // 获取用户信息
  // 如果用户不存在则创建一个默认用户
  const fetchUser = async (userId: string): Promise<boolean> => {
    try {
      isLoading.value = true
      // 模拟网络请求延迟
      await new Promise(resolve => setTimeout(resolve, 800))

      // 从"数据库"获取用户或创建默认用户
      currentUser.value = userDatabase[userId] || {
        id: userId,
        name: '新用户',
        bio: '这个人很懒，什么都没写~',
        location: '未知',
        avatar: '/avatars/default.jpg',
      }

      return true
    }
    catch (error) {
      console.error('获取用户信息失败:', error)
      return false
    }
    finally {
      isLoading.value = false
    }
  }

  // 清除当前用户信息
  const clearUser = () => {
    currentUser.value = null
  }

  // 更新用户信息
  const updateUser = (userData: Partial<User>) => {
    if (currentUser.value) {
      currentUser.value = { ...currentUser.value, ...userData }
    }
  }

  // 更新用户头像
  const updateAvatar = (avatarUrl: string) => {
    if (currentUser.value) {
      currentUser.value.avatar = avatarUrl
    }
  }

  return {
    currentUser,
    isLoading,
    fetchUser,
    clearUser,
    updateUser,
    updateAvatar,
  }
})
