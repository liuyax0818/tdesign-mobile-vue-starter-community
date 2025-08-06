import { reRequest } from '@/utils/request'

export function handleLoginApi(username: string, password: string) {
  return reRequest.post<BaseHttpResp>('/login', { username, password })
}

export function getUserInfoApi() {
  return reRequest.get<BaseHttpResp>('/getUserInfo')
}

export function getUserListApi(param) {
  return reRequest.get<BaseHttpResp>('/getUserList', param)
}
