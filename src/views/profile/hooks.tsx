import { FileCopyIcon, FormIcon, SearchIcon, UploadIcon } from 'tdesign-icons-vue-next'
import dataCenter from '@/assets/profile/func@2x.png'
import qq from '@/assets/profile/qq@2x.png'
import tdoc from '@/assets/profile/tdoc@2x.png'
import tmap from '@/assets/profile/tmap@2x.png'
import wechat from '@/assets/profile/wechat@2x.png'

export function useProfileHook() {
  const loginStatus = ref<boolean>(false)
  const userInfo = reactive({
    avatar: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
    username: '小小轩',
    tags: [
      { label: '天秤座', icon: 'discount' },
      { label: '深圳', icon: 'location' },
    ],
  })

  const router = useRouter()

  // 跳转编辑页面
  function goToEdit() {
    router.push('/profile/info')
  }

  /** 跳转登录页 */
  function goToLogin() {
    router.push('/login')
  }

  // 跳转设置页面
  function goToSettings() {
    router.push('/setting')
  }

  const publishStatus = [
    { name: '全部发布', icon: () => h(FormIcon) },
    { name: '审核中', icon: () => h(SearchIcon) },
    { name: '已发布', icon: () => h(UploadIcon) },
    { name: '草稿箱', icon: () => h(FileCopyIcon) },
  ]
  const services = [
    { label: '微信', icon: wechat },
    { label: 'QQ', icon: qq },
    { label: '腾讯文档', icon: tdoc },
    { label: '腾讯地图', icon: tmap },
    { label: '数据中心', icon: dataCenter },
    { label: '数据中心', icon: dataCenter },
    { label: '数据中心', icon: dataCenter },
    { label: '数据中心', icon: dataCenter },
  ]

  return {
    services,
    userInfo,
    loginStatus,
    publishStatus,
    goToEdit,
    goToLogin,
    goToSettings,
  }
}
