import { request } from '@/utils/request'

/** 获取消息列表 */
export function getMessageListApi<T = any>() {
  return request.get<BaseHttpResp<T>>('/getMessageList')
}

/** 已读消息 */
export function readMessageApi(id: string) {
  return request.post<BaseHttpResp<string>>('/readMessage', {
    id,
  })
}

/** 获取未读数量 */
export function getUnReadCountApi() {
  return request.get<BaseHttpResp<number>>('/getUnReadCount')
}
