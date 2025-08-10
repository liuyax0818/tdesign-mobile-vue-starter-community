import { Toast } from 'tdesign-mobile-vue'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

export function useVerification() {
  const route = useRoute()

  const phoneNumber = computed(() => route.query.phone as string || '')

  const verificationCode = ref('')
  const countdown = ref(0)
  const canResend = computed(() => countdown.value === 0)

  const sendVerificationCode = () => {
    if (!phoneNumber.value) {
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

  const verifyAndLogin = () => {
    if (!verificationCode.value) {
      return
    }

    console.log('验证验证码:', verificationCode.value)
    Toast({ message: '验证码验证成功', theme: 'success' })
  }

  return {
    phoneNumber,
    verificationCode,
    countdown,
    canResend,
    sendVerificationCode,
    verifyAndLogin,
  }
}
