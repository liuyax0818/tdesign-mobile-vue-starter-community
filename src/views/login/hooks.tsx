export function useLoginHook() {
  const currStep = ref(1)
  const router = useRouter()

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
      return '请输入验证码'
    }
    else {
      return '欢迎登录 TDesign'
    }
  })

  const btnText = computed(() => {
    if (currStep.value === 2) {
      return '验证并登录'
    }
    else {
      return '登录'
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

  function handleClick() {
    if (currStep.value === 1) {
      // 账号密码校验...
      return
    }
    if (currStep.value === 2) {
      // 手机号校验...
      currStep.value = 3
      return
    }

    if (currStep.value === 3) {
      // 验证码校验...
      router.replace('/profile')
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
