import { defineStore } from 'pinia'
import { ref } from 'vue'

interface User {
  id: string
  name: string
  bio: string
  location: string
  avatar: { src: string, alt: string }
  // 可扩展字段
  gender?: string
  birthday?: string
  website?: string
}

const DEFAULT_AVATAR = {
  src: '/avatars/placeholder.jpg',
  alt: '默认头像',
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
      avatar: { src: '/avatars/me.jpg', alt: '小小轩的头像' },
      gender: '男',
      birthday: '1990-10-01',
    },
    'user-2': {
      id: 'user-2',
      name: '测试用户',
      bio: '水瓶座',
      location: '北京',
      avatar: { src: '/avatars/user1.jpg', alt: '测试用户的头像' },
      gender: '女',
      birthday: '1995-01-20',
    },
  }

  // 获取用户信息
  // 如果用户不存在则创建一个默认用户
  const fetchUser = async (userId: string): Promise<boolean> => {
    try {
      isLoading.value = true

      // 从"数据库"获取用户或创建默认用户
      currentUser.value = userDatabase[userId] || {
        id: userId,
        name: '新用户',
        bio: '这个人很懒，什么都没写~',
        location: '未知',
        avatar: DEFAULT_AVATAR,
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
      currentUser.value = {
        ...currentUser.value,
        ...userData,
        // 确保avatar对象完整
        avatar: {
          ...currentUser.value.avatar,
          ...(userData.avatar || {}),
        },
      }
    }
  }

  // 更新用户头像
  const updateAvatar = (avatarData: { src: string, alt?: string }) => {
    if (currentUser.value) {
      currentUser.value.avatar = {
        src: avatarData.src,
        alt: avatarData.alt || `${currentUser.value.name}的头像`,
      }
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
