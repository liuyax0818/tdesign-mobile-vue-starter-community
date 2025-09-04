import { request } from '@/utils/request'

// 登录接口
export function loginApi(data: { username: string, password: string }) {
  return request.post('/api/login', data)
}

/** 获取个人信息 */
export function getProfileInfoApi(id: string) {
  return request.get('/getProfileInfo', { id })
}

/** 更新个人信息 */
export function updateProfileInfoApi(data: any) {
  return request.post('/updateProfileInfo', data)
}
