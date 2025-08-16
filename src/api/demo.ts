import { request } from '@/utils/request'

export function handleLoginApi(username: string, password: string) {
  return request.post<BaseHttpResp>('/login', { username, password })
}

export function getUserInfoApi() {
  return request.get<BaseHttpResp>('/getUserInfo')
}

export function getUserListApi(param) {
  return request.get<BaseHttpResp>('/getUserList', param)
}

export function getProfileInfoApi() {
  return request.get<BaseHttpResp>('/getProfileInfo')
}

export function updateProfileInfoApi(data: any) {
  return request.post<BaseHttpResp>('/updateProfileInfo', data)
}
