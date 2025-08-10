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
  const formRef = ref()
  const formData = reactive<LoginForm>({
    username: '',
    password: '',
  })

  // 表单验证规则
  const rules = {
    username: [
      { required: true, message: '请输入用户名', type: 'error' as const },
      { min: 3, max: 20, message: '用户名长度应为3-20个字符', type: 'error' as const },
    ],
    password: [
      { required: true, message: '请输入密码', type: 'error' as const },
      { min: 4, max: 20, message: '密码长度应为4-20个字符', type: 'error' as const },
    ],
  }

  async function handleLogin() {
    // 表单验证
    const valid = await formRef.value?.validate()
    if (!valid) {
      return
    }

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
    formRef,
    rules,
  }
}
