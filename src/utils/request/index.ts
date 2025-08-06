import type { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import type { CustomError, ErrorResponsePayload, RequestMethods } from './types'

import axios from 'axios'

import { getToken, useStorage } from '@/utils/global'

// 重试相关常量
const MAX_RETRY_TIMES = 3 // 最大重试次数
const RETRY_STATUS_CODES = [408, 500, 502, 503, 504] // 需要重试的HTTP状态码
const INITIAL_RETRY_DELAY = 1000 // 初始重试延迟时间(ms)

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// 请求拦截器
request.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    config.headers.Authorization = getToken()
    config.retryCount = config.retryCount || 0

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
request.interceptors.response.use(
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
    const isRetryableStatus = error.response && RETRY_STATUS_CODES.includes(error.response.status)

    if (
      config
      && (config.retryCount || 0) < MAX_RETRY_TIMES
      && (isTimeout || isNetworkError || isRetryableStatus)
    ) {
      config.retryCount = (config.retryCount || 0) + 1
      // 使用指数退避算法计算等待时间
      const delay = INITIAL_RETRY_DELAY * 2 ** ((config.retryCount || 0) - 1)
      await new Promise(resolve => setTimeout(resolve, delay))
      return request(config)
    }

    // 统一错误信息格式
    let message = '网络请求失败'
    let code = 500

    if (error.response) {
      code = error.response.status
      switch (error.response.status) {
        case 401: {
          message = '未授权，请重新登录'
          useStorage().removeItem('token')
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

// GET 请求
export function get<T = unknown>(url: string, params?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<T> {
  return request({
    method: 'get',
    url,
    params,
    ...config,
  })
}

// POST 请求
export function post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
  return request({
    method: 'post',
    url,
    data,
    ...config,
  })
}

// PUT 请求
export function put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
  return request({
    method: 'put',
    url,
    data,
    ...config,
  })
}

// DELETE 请求
export function del<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
  return request({
    method: 'delete',
    url,
    data,
    ...config,
  })
}

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
    baseURL: import.meta.env.VITE_API_BASE_URL, // [PERF] 这个会由 vite 根据当前环境动态读取，https://cn.vitejs.dev/guide/env-and-mode.html#env-files
    timeout: 3000, // [PERF] timeout不要太长，axios默认三秒不是没有原因的
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })

  /** 请求拦截器 */
  private interceptorsRequest() {
    TmvRequest.Instance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        config.headers.Authorization = getToken() // [PERF] token放在cookie里是否更合适一些？
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
      // [PERF] 此处有点长了，是否考虑以下解耦？
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
          return request(config)
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

  // [PERF] get, post, put... 里面全一个逻辑，可以考虑单独封装一个公共请求，后期处理需求起来也方便
  // [PERF] 抽离 get、post 就好，其他的很少会用到，即使有需求直接用公共请求函数，特殊需求单独处理

  /** 抽离 get */
  public get<T = unknown>(url: string, params?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<T> {
    return this.http('GET', url, { params }, config)
  }

  /** 抽离 post */
  public post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.http('POST', url, { data }, config)
  }
}

// 导出请求方法
export default {
  get,
  post,
  put,
  delete: del,
}

export const reRequest = new TmvRequest()
