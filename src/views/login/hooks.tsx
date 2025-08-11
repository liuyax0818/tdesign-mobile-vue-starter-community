import { Toast } from 'tdesign-mobile-vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { handleLoginApi } from '@/api/demo'

export interface LoginForm {
  username: string
  password: string
}

export function useLoginHook() {
  const router = useRouter()

  const loading = ref(false)
  const formData = reactive<LoginForm>({
    username: '',
    password: '',
  })

  async function handleLogin() {
    if (!formData.username || !formData.password) {
      Toast({ message: '请填写完整的登录信息', theme: 'warning' })
      return
    }

    loading.value = true

    try {
      const res = await handleLoginApi(formData.username, formData.password)
      console.log(res, 'res')

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
      console.error('登录失败:', error)
      Toast({
        message: error?.message || '网络错误，请稍后重试',
        theme: 'error',
      })
    }
    finally {
      loading.value = false
    }
  }

  return {
    formData,
    loading,
    handleLogin,
  }
}
