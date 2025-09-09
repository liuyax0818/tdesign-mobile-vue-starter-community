import type { UserInfo } from '../../types/user'

const STORAGE_KEYS = {
  TOKEN: 'token',
  USER_INFO: 'userInfo',
} as const

export const storage = {
  getToken(): string {
    return localStorage.getItem(STORAGE_KEYS.TOKEN) || ''
  },

  setToken(token: string): void {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token)
  },

  removeToken(): void {
    localStorage.removeItem(STORAGE_KEYS.TOKEN)
  },

  getUserInfo(): UserInfo | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_INFO)
      return data ? JSON.parse(data) : null
    }
    catch {
      return null
    }
  },

  setUserInfo(userInfo: UserInfo): void {
    localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(userInfo))
  },

  removeUserInfo(): void {
    localStorage.removeItem(STORAGE_KEYS.USER_INFO)
  },

  clear(): void {
    this.removeToken()
    this.removeUserInfo()
  },
}
