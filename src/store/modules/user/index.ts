import type { LoginByPhone, LoginByUname, UserInfo } from './types'

import { defineStore } from 'pinia'
import { loginByPhoneApi, loginByUnameApi } from '@/api/user'
import { store } from '@/store'

const useUserStore = defineStore('tmv-user', {
  state: (): UserInfo => ({
    id: '',
    username: '',
    avatar: '',
    tags: [],
  }),
  actions: {
    SET_USERID(val: UserInfo['id']) {
      this.id = val
    },
    SET_USERNAME(val: UserInfo['username']) {
      this.username = val
    },
    SET_AVATAR(val: UserInfo['avatar']) {
      this.avatar = val
    },
    SET_TAGS(val: UserInfo['tags']) {
      this.tags = val
    },
    /** 用户名密码登录 */
    loginByUsername<T>(param: LoginByUname) {
      return loginByUnameApi<T>(param)
    },

    /** 手机号验证码登录 */
    loginByPhone<T>(param: LoginByPhone) {
      return loginByPhoneApi<T>(param)
    },

    /** 前端登出 */
    logout() {

    },
  },
})

export function useUserStoreHook() {
  // 此处放一些使用 store 的额外操作
  // ...
  return useUserStore(store)
}
