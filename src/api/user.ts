import { request } from '@/utils/request'

/** 获取个人信息 */
export function getProfileInfoApi(id: string) {
  return request.get<BaseHttpResp>('/getProfileInfo', { id })
}

/** 更新个人信息 */
export function updateProfileInfoApi(data: any) {
  return request.post<BaseHttpResp>('/updateProfileInfo', data)
}
