import type { FormData, TagItem, UploadProps } from './types'

import { Message, Toast } from 'tdesign-mobile-vue'

import { getTagListApi } from '@/api/home'

import { getPublishResultApi } from '@/api/publish'

export function usePublishHook() {
  const router = useRouter()

  // 发布内容
  const formData = reactive<FormData>({
    content: '',
    files: [],
    tags: [],
    location: '',
  })

  // 标签选项
  const tags = ref<TagItem[]>([])

  // 上传配置
  const uploadConfig: UploadProps = {
    multiple: true,
    accept: 'image/*',
    action: '//service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo',
    max: 9,
    sizeLimit: { size: 3 * 1024 * 1024, unit: 'B' as const },
  }

  function getTagList() {
    getTagListApi<TagItem[]>().then((res) => {
      tags.value = res.data
    })
  }

  function onValidate(context: any) {
    if (context.type === 'FILE_TYPE_ERROR') {
      Toast({
        theme: 'error',
        message: '文件类型错误，仅支持图片格式',
      })
    }
    else if (context.type === 'FILE_OVER_SIZE_LIMIT') {
      Toast({
        theme: 'error',
        message: '文件大小不能超过 3MB',
      })
    }
  }

  async function showSuccessMessage() {
    const res = getPublishResultApi(formData)
    if ((await res).code === 200 && (await res).data.success) {
      Message.success({
        offset: [108, 12],
        content: '发布成功',
        duration: 5000,
        icon: true,
        zIndex: 20000,
      })
    }
  }

  function onPublish() {
    if (!formData.content.trim() && formData.files.length === 0) {
      return
    }

    // 发布成功后显示通知并返回首页
    showSuccessMessage()
    router.push('/')
  }

  function onSaveDraft() {
    // 保存草稿后返回首页
    router.push('/')
  }

  function onAddLocation() {
    // 选择位置逻辑...
  }

  function onTagChange(id: TagItem['id'], checked: boolean) {
    if (checked) {
      formData.tags.push(id)
    }
    else {
      formData.tags = formData.tags.filter(v => v !== id)
    }
  }

  return {
    tags,
    formData,
    uploadConfig,
    onPublish,
    getTagList,
    onValidate,
    onSaveDraft,
    onTagChange,
    onAddLocation,
  }
}
