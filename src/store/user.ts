import { defineStore } from 'pinia'
import { getProfileInfoApi, loginApi } from '@/api/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}'),
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
      localStorage.setItem('token', token)
    },

    setUserInfo(userInfo: any) {
      this.userInfo = userInfo
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
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
            gender: 'man',
            birthday: '1990-10-01',
            bio: '热爱生活的天秤座',
            tags: [
              { label: '天秤座', icon: 'discount' },
              { label: '深圳', icon: 'location' },
            ],
          },
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
      // 如果已经有用户信息，直接返回
      if (Object.keys(this.userInfo).length > 0) {
        return {
          code: 200,
          data: this.userInfo,
          message: '获取成功',
        }
      }

      // 否则从localStorage获取
      const storedInfo = localStorage.getItem('userInfo')
      if (storedInfo) {
        this.userInfo = JSON.parse(storedInfo)
        return {
          code: 200,
          data: this.userInfo,
          message: '获取成功',
        }
      }

      // 如果都没有，返回空数据
      return {
        code: 200,
        data: {},
        message: '用户未登录',
      }
    },

    logout() {
      this.token = ''
      this.userInfo = {}
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
    },
  },
})
