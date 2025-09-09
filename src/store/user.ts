import type { UserInfo } from '../../types/user'
import { defineStore } from 'pinia'
import { getProfileInfoApi, loginApi } from '@/api/user'
import { storage } from '@/utils/storage'

const defaultUserInfo: UserInfo = {
  username: '未登录',
  avatar: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
  address: '未知',
  gender: 'secret',
  birthday: '',
}

interface State {
  token: string
  userInfo: UserInfo
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    token: storage.getToken(),
    userInfo: storage.getUserInfo() || defaultUserInfo,
  }),

  getters: {
    isLoggedIn: state => !!state.token,
    username: state => state.userInfo.username || '小小轩',
    avatar: state => state.userInfo.avatar || 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
    address: state => state.userInfo.address || '深圳',
  },

  actions: {
    setToken(token: string) {
      this.token = token
      storage.setToken(token)
    },

    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo
      storage.setUserInfo(userInfo)
    },

    async login(credentials: { username: string, password: string }) {
      try {
        // 调用登录API - 使用mock数据模拟登录
        const mockResponse = {
          code: 200,
          data: {
            token: `mock-token-${Date.now()}`,
            username: '小小轩',
            avatar: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
            address: '深圳',
            gender: 'man' as const,
            birthday: '1990-10-01',
            bio: '热爱生活的天秤座',
            tags: [
              { label: '天秤座', icon: 'discount' },
              { label: '深圳', icon: 'location' },
            ],
          } satisfies UserInfo,
          message: '登录成功',
        }

        if (mockResponse.code === 200) {
          this.setToken(mockResponse.data.token)
          this.setUserInfo(mockResponse.data)
          return Promise.resolve(mockResponse)
        }
        else {
          return Promise.reject(mockResponse)
        }
      }
      catch (error) {
        return Promise.reject(error)
      }
    },
    async fetchUserInfo() {
      const storedInfo = storage.getUserInfo()
      if (storedInfo) {
        this.userInfo = storedInfo
        return {
          code: 200,
          data: this.userInfo,
          message: '获取成功',
        }
      }

      return {
        code: 200,
        data: this.userInfo,
        message: '用户未登录',
      }
    },

    logout() {
      this.token = ''
      this.userInfo = defaultUserInfo
      storage.clear()
    },
  },
})
