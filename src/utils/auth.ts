import { useStorage } from '@/utils/global'

let authNavigator: ((path?: string) => void) | null = null
let registered = false

export function registerAuthNavigator(navigator: (path?: string) => void) {
  if (registered)
    return
  authNavigator = navigator
  registered = true
}

export function clearAuth() {
  const { removeItem } = useStorage()
  removeItem('token')
  removeItem('userInfo')
}

export function redirectToLogin() {
  if (authNavigator) {
    authNavigator('/login')
  }
}

export function handleUnauthorized() {
  clearAuth()
  redirectToLogin()
}

function setToken(toekn: string) {

}
