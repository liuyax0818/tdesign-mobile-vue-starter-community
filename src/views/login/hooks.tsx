import { Toast } from 'tdesign-mobile-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { handleLoginApi } from '@/api/demo'

export interface LoginHookReturn {
  loading: any
  isPasswordMode: any
  agreeTerms: any
  countryCode: any
  phoneNumber: any
  password: any
  countryOptions: Array<{ label: string, value: string, disabled: boolean }>
  handlePasswordLogin: () => Promise<void>
  handleVerificationLogin: () => void
  toggleLoginMode: () => void
  handleForgotPassword: () => void
  handleCountryChange: (value: string) => void
}

export function useLoginHook(): LoginHookReturn {
  const router = useRouter()

  const loading = ref(false)
  const isPasswordMode = ref(false)
  const agreeTerms = ref(false)
  const countryCode = ref('+86')
  const phoneNumber = ref('')
  const password = ref('')

  const countryOptions = [
    { label: '+86', value: '+86', disabled: false },
  ]

  async function handlePasswordLogin() {
    if (!agreeTerms.value) {
      Toast({ message: '请先同意用户协议', theme: 'warning' })
      return
    }

    if (!phoneNumber.value || !password.value) {
      Toast({ message: '请填写完整的登录信息', theme: 'warning' })
      return
    }

    loading.value = true

    try {
      const res = await handleLoginApi(phoneNumber.value, password.value)
      console.log(res, '密码登录结果')

      if (res.code === 200) {
        Toast({ message: '登录成功', theme: 'success' })
        localStorage.setItem('token', res.data.token || '')
        router.push('/')
      }
      else {
        Toast({ message: res.message || '登录失败', theme: 'error' })
      }
    }
    catch (error: any) {
      console.error('密码登录失败:', error)
      Toast({
        message: error?.message || '网络错误，请稍后重试',
        theme: 'error',
      })
    }
    finally {
      loading.value = false
    }
  }

  function handleVerificationLogin() {
    if (!agreeTerms.value) {
      Toast({ message: '请先同意用户协议', theme: 'warning' })
      return
    }

    if (!phoneNumber.value) {
      Toast({ message: '请输入手机号', theme: 'warning' })
      return
    }

    router.push(`/login/verification?phone=${encodeURIComponent(phoneNumber.value)}`)
  }

  function toggleLoginMode() {
    isPasswordMode.value = !isPasswordMode.value
    phoneNumber.value = ''
    password.value = ''
  }

  function handleForgotPassword() {
    console.log('忘记密码')
  }

  function handleCountryChange(value: string) {
    countryCode.value = value
  }

  return {
    loading,
    isPasswordMode,
    agreeTerms,
    countryCode,
    phoneNumber,
    password,
    countryOptions,
    handlePasswordLogin,
    handleVerificationLogin,
    toggleLoginMode,
    handleForgotPassword,
    handleCountryChange,
  }
}
