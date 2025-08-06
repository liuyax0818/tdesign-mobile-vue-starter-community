/**
 * 获取已注册的全局配置
 * @see https://vuejs.org/api/application.html#app-config-globalproperties
 */
export function useGlobal<T = GlobalProperties>(): T {
  const instance = getCurrentInstance()
  if (!instance) {
    throw new Error('请在使用 setup 的 vue 组件内使用此函数，且尽可能避免在内部函数中调用')
  }
  return instance.appContext.config.globalProperties as T
}

/**
 * 操作存储
 * @param type 存储类型，默认 `local`
 */
export function useStorage(type: 'local' | 'session' = 'local') {
  const storage = type === 'local' ? localStorage : sessionStorage

  function getItem<T>(k: string): T {
    const val = storage.getItem(k)
    if (val === null) {
      return null
    }
    try {
      return JSON.parse(val) as T
    }
    catch {
      throw new Error(`Failed to parse ${type}Storage key "${k}" of "${val}"`)
    }
  }

  function setItem<T>(k: string, v: T) {
    storage.setItem(k, JSON.stringify(v))
  }

  function removeItem(k: string) {
    storage.removeItem(k)
  }

  function clearAll() {
    storage.clear()
  }

  return {
    getItem,
    setItem,
    removeItem,
    clearAll,
  }
}

/** 获取 token */
export function getToken(): string {
  const { getItem } = useStorage()
  const token = getItem<string>('token')

  if (token) {
    return `Bearer ${token}`
  }

  return ''
}
