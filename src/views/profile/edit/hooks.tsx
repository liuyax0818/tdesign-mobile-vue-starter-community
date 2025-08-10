import type { DateValue, UploadFile } from 'tdesign-mobile-vue'
import { Toast } from 'tdesign-mobile-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export interface ProfileForm {
  username: string
  gender: string
  birthday: string
  address: string
  bio: string
  photos: UploadFile[]
}

export function useProfileEdit() {
  const _router = useRouter()

  // TODO: 等 auth store 创建后启用登录检查
  // const authStore = useAuthStore()
  // if (!authStore.isAuthenticated) {
  //   Toast({ message: '请先登录', duration: 1500 })
  //   _router.push('/login')
  //   return
  // }
  const formData = ref<ProfileForm>({
    username: '小小轩',
    gender: 'male',
    birthday: '1994-09-27',
    address: '广东 深圳',
    bio: '在你身边，为你设计',
    photos: [
      { url: 'https://tdesign.gtimg.com/mobile/demos/upload4.png', status: 'success', type: 'image' },
      { url: 'https://tdesign.gtimg.com/mobile/demos/upload6.png', status: 'success', type: 'image' },
    ],
  })

  const addressValue = ref(['guangdong', 'shenzhen'])
  const isBirthdayPickerVisible = ref(false)
  const isAddressPickerVisible = ref(false)

  const addressOptions = [
    [
      { label: '广东', value: 'guangdong' },
      { label: '浙江', value: 'zhejiang' },
      { label: '江苏', value: 'jiangsu' },
    ],
    [
      { label: '广州', value: 'guangzhou' },
      { label: '深圳', value: 'shenzhen' },
      { label: '珠海', value: 'zhuhai' },
    ],
  ]

  // 表单校验错误状态
  const errors = ref({
    username: '',
    gender: '',
    birthday: '',
    address: '',
    bio: '',
    photos: '',
  })

  // 校验规则
  function validateUsername(value: string): string {
    if (!value.trim()) {
      return '用户名不能为空'
    }
    if (value.length < 2) {
      return '用户名至少2个字符'
    }
    if (value.length > 20) {
      return '用户名不能超过20个字符'
    }
    if (!/^[\u4E00-\u9FA5\w]+$/.test(value)) {
      return '用户名只能包含中文、英文、数字和下划线'
    }
    return ''
  }

  function validateGender(value: string): string {
    if (!value) {
      return '请选择性别'
    }
    return ''
  }

  function validateBirthday(value: string): string {
    if (!value) {
      return '请选择生日'
    }
    const birthDate = new Date(value)
    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()
    if (age < 0 || age > 150) {
      return '请选择有效的生日'
    }
    return ''
  }

  function validateAddress(value: string): string {
    if (!value.trim()) {
      return '请选择地址'
    }
    return ''
  }

  function validateBio(value: string): string {
    if (!value.trim()) {
      return '个人简介不能为空'
    }
    if (value.length < 5) {
      return '个人简介至少5个字符'
    }
    return ''
  }

  function validatePhotos(value: UploadFile[]): string {
    if (!value || value.length === 0) {
      return '请至少上传一张照片'
    }
    if (value.length > 9) {
      return '最多上传9张照片'
    }
    return ''
  }

  // 全表单校验
  function validateForm(): boolean {
    errors.value.username = validateUsername(formData.value.username)
    errors.value.gender = validateGender(formData.value.gender)
    errors.value.birthday = validateBirthday(formData.value.birthday)
    errors.value.address = validateAddress(formData.value.address)
    errors.value.bio = validateBio(formData.value.bio)
    errors.value.photos = validatePhotos(formData.value.photos)

    return !Object.values(errors.value).some(error => error !== '')
  }

  function onBirthdayConfirm(value: DateValue) {
    formData.value.birthday = String(value)
    errors.value.birthday = validateBirthday(formData.value.birthday)
    isBirthdayPickerVisible.value = false
  }

  function onAddressConfirm(values: any[]) {
    // 根据选中的值更新地址显示文本
    const selectedLabels: string[] = []
    if (values.length > 0 && addressOptions[0]) {
      const provinceItem = addressOptions[0].find(item => item.value === values[0])
      if (provinceItem) {
        selectedLabels.push(provinceItem.label)
      }
    }
    if (values.length > 1 && addressOptions[1]) {
      const cityItem = addressOptions[1].find(item => item.value === values[1])
      if (cityItem) {
        selectedLabels.push(cityItem.label)
      }
    }

    formData.value.address = selectedLabels.join(' ')
    errors.value.address = validateAddress(formData.value.address)
    isAddressPickerVisible.value = false
  }

  function onBack() {
    console.warn('Trigger: onBack')
  }

  function onSave() {
    if (validateForm()) {
      Toast.success('保存成功！')
    }
    else {
      Toast.error('请检查表单内容')
    }
  }

  return {
    formData,
    addressValue,
    addressOptions,
    isBirthdayPickerVisible,
    isAddressPickerVisible,
    errors,
    validateUsername,
    validateGender,
    validateBirthday,
    validateAddress,
    validateBio,
    validatePhotos,
    validateForm,
    onBirthdayConfirm,
    onAddressConfirm,
    onBack,
    onSave,
  }
}
