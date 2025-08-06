import type { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { useStorage } from './global'

interface ResponseData<T = unknown> {
  code: number
  message: string
  data: T
  success: boolean
}

interface ErrorResponsePayload {
  message?: string
  code?: number
}

interface CustomError extends Error {
  friendlyMessage: string
  code: number
  response?: any
}

// 扩展AxiosRequestConfig类型
declare module 'axios' {
  interface AxiosRequestConfig {
    retryCount?: number
    showLoading?: boolean
    showError?: boolean
  }
}

// 重试相关常量
const MAX_RETRY_TIMES = 3 // 最大重试次数
const RETRY_STATUS_CODES = [408, 500, 502, 503, 504] // 需要重试的HTTP状态码
const INITIAL_RETRY_DELAY = 1000 // 初始重试延迟时间(ms)

function getBaseURL() {
  return import.meta.env.VITE_API_BASE_URL || 'http://xxxx'
}

const request = axios.create({
  baseURL: getBaseURL(),
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// 请求拦截器
request.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const { getItem } = useStorage()
    const token = getItem<string>('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    config.retryCount = config.retryCount || 0

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse<ResponseData<unknown>>): any => {
    const res = response.data
    if (res.code === 200 || res.success) {
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

// 导出请求方法
export default {
  get,
  post,
  put,
  delete: del,
}
