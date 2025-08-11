import type { ProfileForm, UploadFile } from './types'
import dayjs from 'dayjs'
import { addressData } from './data'

export function useInfoHook() {
  const formRef = ref()
  const formData = reactive<ProfileForm>({
    username: '',
    gender: '',
    birthday: '',
    address: '',
    bio: '',
    photos: [
      {
        url: 'https://tdesign.gtimg.com/mobile/demos/upload4.png',
        name: 'uploaded1.png',
        status: 'success',
        type: 'image',
      },
      {
        url: 'https://tdesign.gtimg.com/mobile/demos/upload6.png',
        name: 'uploaded2.png',
        status: 'success',
        type: 'image',
      },
      {
        url: 'https://tdesign.gtimg.com/mobile/demos/upload4.png',
        name: 'uploaded3.png',
        status: 'success',
        type: 'image',
      },
    ],
  })

  const allowSubmit = computed(() => {
    return !!formData.username
      && !!formData.gender
      && !!formData.birthday
      && !!formData.address
      && !!formData.bio
  })

  const provinces = ref(addressData.areaList.map(province => ({
    label: province.label,
    value: province.value,
  })))
  const cities = ref(addressData.areaList[0]?.children?.map(city => ({
    label: city.label,
    value: city.value,
  })) || [])
  const addressColumns = computed(() => [provinces.value, cities.value])

  function onAddressColumnChange(value: any, context: any) {
    const { column, index } = context
    if (column === 0) {
      const selectedProvince = addressData.areaList[index]
      cities.value = selectedProvince?.children?.map(city => ({
        label: city.label,
        value: city.value,
      })) || []
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
  }
}
