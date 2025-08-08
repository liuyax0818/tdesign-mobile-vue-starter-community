import type { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import type { CustomError, ErrorResponsePayload, RequestMethods } from './types'

import axios from 'axios'

import { getToken, useStorage } from '@/utils/global'

class TmvRequest {
  constructor() {
    // 初始化拦截器
    this.interceptorsRequest()
    this.interceptorsResponse()
  }

  /** 最大重试次数 */
  private static MAX_RETRY_TIMES = 3
  /** 需要重试的HTTP状态码 */
  private static RETRY_STATUS_CODES = [408, 500, 502, 503, 504]
  /** 初始重试延迟时间(ms) */
  private static INITIAL_RETRY_DELAY = 1000

  /** axios 实例 */
  private static Instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 3000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })

  /** 请求拦截器 */
  private interceptorsRequest() {
    TmvRequest.Instance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        config.headers.Authorization = getToken()
        config.retryCount = config.retryCount || 0

        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      },
    )
  }

  /** 响应拦截器 */
  private interceptorsResponse() {
    TmvRequest.Instance.interceptors.response.use(
      (response: AxiosResponse<BaseHttpResp<unknown>>): any => {
        const res = response.data
        if (res.code === 200) {
          return res.data
        }
        else {
          const error = new Error(res.message || '请求失败') as Error & { code: number }
          error.code = res.code
          return Promise.reject(error)
        }
      },
      async (error: AxiosError) => {
        const config = error.config as AxiosRequestConfig & { retryCount?: number }

        // 判断是否需要重试
        const isTimeout = error.code === 'ECONNABORTED' || error.message?.includes('timeout')
        const isNetworkError = !error.response
        const isRetryableStatus = error.response && TmvRequest.RETRY_STATUS_CODES.includes(error.response.status)

        if (
          config
          && (config.retryCount || 0) < TmvRequest.MAX_RETRY_TIMES
          && (isTimeout || isNetworkError || isRetryableStatus)
        ) {
          config.retryCount = (config.retryCount || 0) + 1
          // 使用指数退避算法计算等待时间
          const delay = TmvRequest.INITIAL_RETRY_DELAY * 2 ** ((config.retryCount || 0) - 1)
          await new Promise(resolve => setTimeout(resolve, delay))
          return TmvRequest.Instance(config)
        }

        // 统一错误信息格式
        let message = '网络请求失败'
        let code = 500

        if (error.response) {
          code = error.response.status
          switch (error.response.status) {
            case 401: {
              message = '未授权，请重新登录'
              const { removeItem } = useStorage()
              removeItem('token')
              break
            }
            case 403:
              message = '拒绝访问'
              break
            case 404:
              message = '请求地址不存在'
              break
            case 500:
              message = '服务器内部错误'
              break
            default:
              message = (error.response.data as ErrorResponsePayload)?.message || '请求失败'
          }
        }
        else if (isTimeout) {
          message = '请求超时，请检查网络'
          code = 408
        }
        else if (isNetworkError) {
          message = '网络连接失败，请检查网络'
          code = 0
        }

        // 显示错误信息
        if (config?.showError !== false) {
          // 这里可以集成toast或message组件
          console.error(message)
        }

        // 返回错误对象
        const customError = Object.assign(new Error(message), {
          friendlyMessage: message,
          code,
          response: error.response,
        }) as CustomError
        return Promise.reject(customError)
      },
    )
  }

  /** 公共请求函数 */
  public http<T = unknown>(method: RequestMethods, url: string, params?: AxiosRequestConfig, config?: AxiosRequestConfig): Promise<T> {
    return TmvRequest.Instance.request({
      method,
      url,
      ...params,
      ...config,
    })
  }

  /** 抽离 get */
  public get<T = unknown>(url: string, params?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<T> {
    return this.http('GET', url, { params }, config)
  }

  /** 抽离 post */
  public post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.http('POST', url, { data }, config)
  }
}

export const reRequest = new TmvRequest()
