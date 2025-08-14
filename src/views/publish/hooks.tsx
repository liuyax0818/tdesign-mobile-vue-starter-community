import { ref } from 'vue'
import { useRouter } from 'vue-router'
// 逻辑写得非常糟糕，还有待调整
export function usePublish() {
  const router = useRouter()

  // 发布内容
  const content = ref('')
  const files = ref([])

  // 标签选项
  const tags = ref([
    { label: '#AI绘画', checked: false },
    { label: '#版权素材', checked: false },
    { label: '#原创', checked: false },
    { label: '#风景', checked: false },
    { label: '#鬼畜', checked: false },
  ])

  // 上传配置
  const uploadConfig = {
    multiple: true,
    accept: 'image/*',
    action: '//service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo',
    max: 9,
    sizeLimit: { size: 3000000, unit: 'B' as const },
  }

  function handleLeftClick() {
    router.back()
  }

  function onValidate(context: any) {
    if (context.type === 'FILE_TYPE_ERROR') {
      TToast.show('文件类型错误，仅支持图片格式', { theme: 'error' })
    }
    else if (context.type === 'FILE_OVER_SIZE_LIMIT') {
      TToast.show('文件大小不能超过3MB', { theme: 'error' })
    }
  }

  function onPublish() {
    if (!content.value.trim() && files.value.length === 0) {
      return
    }

    // 发布成功后返回首页
    router.push('/')
  }

  function onSaveDraft() {
    // 保存草稿后返回首页
    router.push('/')
  }

  function onAddLocation() {

  }

  function onTagChange(index: number, checked: boolean) {
    tags.value[index].checked = checked
  }

  return {
    content,
    files,
    tags,
    uploadConfig,
    handleLeftClick,
    onValidate,
    onPublish,
    onSaveDraft,
    onAddLocation,
    onTagChange,
  }
}
