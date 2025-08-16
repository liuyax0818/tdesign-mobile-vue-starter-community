import { Toast } from 'tdesign-mobile-vue'

export function useVerification() {
  const route = useRoute()
  const router = useRouter()

  const phoneNumber = computed(() => route.query.phone as string || '')
  const verificationCode = ref('')
  const countdown = ref(0)
  const canResend = computed(() => countdown.value === 0)

  const sendVerificationCode = () => {
    if (!phoneNumber.value) {
      Toast({ message: '手机号不能为空', theme: 'warning' })
      return
    }

    // 手机号格式验证
    if (!/^1[3-9]\d{9}$/.test(phoneNumber.value)) {
      Toast({ message: '请输入正确的手机号', theme: 'warning' })
      return
    }

    countdown.value = 60
    const timer = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(timer)
      }
    }, 1000)

    console.log('发送验证码到:', phoneNumber.value)
  }

  const verifyAndLogin = async () => {
    if (!verificationCode.value) {
      Toast({ message: '请输入验证码', theme: 'warning' })
      return
    }

    try {
      if (verificationCode.value === '1145') {
        Toast({ message: '验证码验证成功', theme: 'success' })
        router.push('/')
      }
      else {
        Toast({ message: '验证码错误，测试验证码：1145', theme: 'error' })
      }
    }
    catch (error) {
      console.error('验证码验证失败:', error)
      Toast({ message: '验证码验证失败，请重试', theme: 'error' })
    }
  }

  onMounted(() => {
    if (phoneNumber.value) {
      sendVerificationCode()
    }
  })

  return {
    phoneNumber,
    verificationCode,
    countdown,
    canResend,
    sendVerificationCode,
    verifyAndLogin,
  }
}
