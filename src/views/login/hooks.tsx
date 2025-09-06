import { useUserStore } from '@/store/user'

export function useLoginHook(t) {
  const currStep = ref(1)
  const router = useRouter()
  const userStore = useUserStore()

  const form = reactive({
    account: '',
    password: '',
    phone: '',
    verCode: '',
    region: '+86',
    isAgree: false,
  })

  const title = computed(() => {
    if (currStep.value === 3) {
      return t('pageLogin.title2')
    }
    else {
      return t('pageLogin.title1')
    }
  })

  const btnText = computed(() => {
    if (currStep.value === 2) {
      return t('pageLogin.btnVerLogin')
    }
    else {
      return t('pageLogin.btnLogin')
    }
  })

  const allowClick = computed(() => {
    if (!form.isAgree) {
      return false
    }
    if (currStep.value === 1) {
      // 账号密码
      if (form.account.length === 0 || form.password.length === 0) {
        return false
      }
    }

    if (currStep.value === 2) {
      // 手机号
      if (form.phone.length !== 11) {
        return false
      }
    }

    if (currStep.value === 3) {
      // 验证码
      if (form.verCode.length !== 6) {
        return false
      }
    }
    return true
  })

  async function handleClick() {
    if (currStep.value === 1) {
      // 账号密码登录
      try {
        await userStore.login({
          username: form.account,
          password: form.password,
        })
        router.replace('/profile')
      }
      catch (error) {
        console.error('登录失败:', error)
      }
      return
    }

    if (currStep.value === 2) {
      // 手机号校验...
      currStep.value = 3
      return
    }

    if (currStep.value === 3) {
      // 验证码登录
      try {
        await userStore.login({
          username: form.phone,
          password: 'sms-verification',
        })
        router.replace('/profile')
      }
      catch (error) {
        console.error('登录失败:', error)
      }
    }
  }

  return {
    form,
    title,
    btnText,
    currStep,
    allowClick,
    handleClick,
  }
}
