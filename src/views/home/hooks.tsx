import { getUserInfoApi, getUserListApi, handleLoginApi } from '@/api/demo'
import { useStorage } from '@/utils/global'

export function useHomeHook() {
  function reHandleLogin(username: string, password: string) {
    handleLoginApi(username, password).then((res) => {
      console.log('登录成功:', res)
    }).catch((err) => {
      console.error('登录失败:', err)
    })
  }

  function reHandleGetUserInfo() {
    getUserInfoApi().then((res) => {
      console.log('获取用户信息成功:', res)
    }).catch((err) => {
      console.error('获取用户信息失败:', err)
    })
  }

  function reHandleGetUserList() {
    getUserListApi({ curr: 10, size: 20 }).then((res) => {
      console.log('获取用户列表成功:', res)
    }).catch((err) => {
      console.error('获取用户列表失败:', err)
    })
  }

  function reHandleClearToken() {
    const { removeItem } = useStorage()
    removeItem('token')
    console.log('Token已清除')
  }

  return {
    reHandleLogin,
    reHandleGetUserInfo,
    reHandleGetUserList,
    reHandleClearToken,
  }
}
