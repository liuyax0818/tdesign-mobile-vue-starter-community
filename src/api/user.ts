import { request } from '@/utils/request'

/** 用户名登录 */
export function loginByUnameApi<T = any>(data: object) {
  return request.post<T>('/loginByUsername', data)
}

/** 验证码登录 */
export function loginByPhoneApi<T = any>(data: object) {
  return request.post<T>('/loginByPhone', data)
}

/** 发送验证码 */
export function sendVerifyCodeApi(data: { phone: string }) {
  return request.post<{ codeId: string }>('/sendVerifyCode', data)
}

/** 获取个人信息 */
export function getProfileInfoApi(id: string) {
  return request.get<any>('/getProfileInfo', { id })
}

/** 更新个人信息 */
export function updateProfileInfoApi(data: any) {
  return request.post('/updateProfileInfo', data)
}
