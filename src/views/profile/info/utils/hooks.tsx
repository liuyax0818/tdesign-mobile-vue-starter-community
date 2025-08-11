import type { ProfileForm, UploadFile } from './types'

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
      && formData.photos.length > 0
  })

  const addressLabel = ref('')
  const formVisible = reactive({
    birthday: false,
    address: false,
  })

  function handleCasChange(val: string, options: any[]) {
    formData.address = val
    addressLabel.value = options?.map(v => v!.label).join(' / ')
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
    handleSubmit,
    handleCasChange,
    handlePicChange,
  }
}
