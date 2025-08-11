import { Toast } from 'tdesign-mobile-vue'
import { handleLoginApi } from '@/api/demo'

export function useLoginHook() {
  const router = useRouter()

  const loading = ref(false)
  const isPasswordMode = ref(false)
  const agreeTerms = ref(false)
  const countryCode = ref('+86')

  const formData = ref({
    phoneNumber: '',
    password: '',
  })

  const rules = {
    phoneNumber: [
      { required: true, message: '请输入账号', type: 'error' },
    ],
    password: [
      { required: true, message: '请输入密码', type: 'error' },
      { min: 4, message: '密码长度不能少于4位', type: 'error' },
    ],
  }

  const countryOptions = [
    { label: '+86', value: '+86', disabled: false },
  ]

  async function handlePasswordLogin() {
    if (!agreeTerms.value) {
      Toast({ message: '请先同意用户协议', theme: 'warning' })
      return
    }

    if (!formData.value.phoneNumber || !formData.value.password) {
      Toast({ message: '请填写完整的登录信息', theme: 'warning' })
      return
    }

    loading.value = true

    try {
      const res = await handleLoginApi(formData.value.phoneNumber, formData.value.password)
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

    if (!formData.value.phoneNumber) {
      Toast({ message: '请输入手机号', theme: 'warning' })
      return
    }

    router.push(`/login/verification?phone=${encodeURIComponent(formData.value.phoneNumber)}`)
  }

  function toggleLoginMode() {
    isPasswordMode.value = !isPasswordMode.value
    formData.value.phoneNumber = ''
    formData.value.password = ''
  }

  function handleForgotPassword() {
    console.log('忘记密码')
  }

  function handleCountryChange(value: string) {
    countryCode.value = value
  }

  function handleSocialLogin(type: 'wechat' | 'qq' | 'work-wechat') {
    console.log(`点击了${type}登录按钮`)

    switch (type) {
      case 'wechat':
        console.log('微信登录逻辑')
        // TODO: 微信登录
        break
      case 'qq':
        console.log('QQ登录逻辑')
        // TODO: QQ登录
        break
      case 'work-wechat':
        console.log('企业微信登录逻辑')
        // TODO: 企业微信登录
        break
    }
  }

  function onSubmit() {
    handlePasswordLogin()
  }

  return {
    loading,
    isPasswordMode,
    agreeTerms,
    countryCode,
    formData,
    rules,
    countryOptions,
    handleVerificationLogin,
    toggleLoginMode,
    handleForgotPassword,
    handleCountryChange,
    handleSocialLogin,
    onSubmit,
  }
}
