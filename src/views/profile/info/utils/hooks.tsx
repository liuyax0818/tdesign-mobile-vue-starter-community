import type { ProfileForm, UploadFile } from './types'
import dayjs from 'dayjs'
import { Toast } from 'tdesign-mobile-vue'
import { getProfileInfoApi, updateProfileInfoApi } from '@/api/demo'
import { addressData } from './data'

export function useInfoHook() {
  const formRef = ref()
  const formData = reactive<ProfileForm>({
    username: '',
    gender: '',
    birthday: '',
    address: '',
    bio: '',
    photos: [],
  })

  const allowSubmit = computed(() => {
    return !!formData.username
      && !!formData.gender
      && !!formData.birthday
      && !!formData.address
      && !!formData.bio
  })

  const provinces = reactive(addressData.areaList.map(province => ({
    label: province.label,
    value: province.value,
  })))
  const cities = reactive(addressData.areaList[0]?.children?.map(city => ({
    label: city.label,
    value: city.value,
  })) || [])
  const addressColumns = computed(() => [provinces, cities])

  function onAddressColumnChange(value: any, context: any) {
    const { column, index } = context
    if (column === 0) {
      const selectedProvince = addressData.areaList[index]
      cities.splice(0, cities.length, ...(selectedProvince?.children?.map(city => ({
        label: city.label,
        value: city.value,
      })) || []))
    }
  }

  const addressLabel = ref('')
  const defaultBirthday = ref(dayjs().subtract(20, 'year').format('YYYY-MM-DD'))
  const birthdayValue = computed({
    get: () => formData.birthday || defaultBirthday.value,
    set: (value: string) => {
      formData.birthday = value
    },
  })
  const formVisible = reactive({
    birthday: false,
    address: false,
  })

  function handleAddressConfirm(val: any, context: any) {
    const { label } = context
    addressLabel.value = label.join(' ')
    formData.address = val.join('-')
    formVisible.address = false
  }

  async function handleSubmit() {
    await formRef.value!.validate()

    try {
      await updateProfileInfoApi(formData)
      Toast({
        theme: 'success',
        message: '保存成功',
        duration: 2000,
      })
    }
    catch {
      Toast({
        theme: 'error',
        message: '保存失败',
        duration: 2000,
      })
    }
  }

  async function loadProfileInfo() {
    try {
      const res = await getProfileInfoApi()
      if (res.code === 200 && res.data) {
        Object.assign(formData, res.data)
        if (res.data.address) {
          addressLabel.value = res.data.address
        }
      }
      console.warn('个人信息数据已加载')
    }
    catch {
      console.warn('加载数据失败，使用默认数据')
    }
  }

  function handlePicChange(files: UploadFile[]) {
    formData.photos = files
  }

  return {
    formRef,
    formData,
    allowSubmit,
    formVisible,
    addressLabel,
    addressColumns,
    birthdayValue,
    handleSubmit,
    handlePicChange,
    handleAddressConfirm,
    onAddressColumnChange,
    loadProfileInfo,
  }
}
