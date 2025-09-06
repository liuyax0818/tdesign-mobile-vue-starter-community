import { FileCopyIcon, FormIcon, SearchIcon, UploadIcon } from 'tdesign-icons-vue-next'
import { Toast } from 'tdesign-mobile-vue'
import dataCenter from '@/assets/profile/func@2x.png'
import qq from '@/assets/profile/qq@2x.png'
import tdoc from '@/assets/profile/tdoc@2x.png'
import tmap from '@/assets/profile/tmap@2x.png'
import wechat from '@/assets/profile/wechat@2x.png'
import { $t } from '@/plugins/i18n'
import { useUserStore } from '@/store/user'

export function useProfileHook() {
  const userStore = useUserStore()
  const loginStatus = ref<boolean>(userStore.isLoggedIn)

  const userInfo = reactive({
    avatar: userStore.avatar,
    username: userStore.username,
    tags: [
      { label: '天秤座', icon: 'discount' },
      { label: userStore.address, icon: 'location' },
    ],
  })

  // 监听登录状态变化
  watch(() => userStore.isLoggedIn, (newVal) => {
    loginStatus.value = newVal
    if (newVal) { // 已登录
      userInfo.avatar = userStore.avatar
      userInfo.username = userStore.username
      userInfo.tags[1].label = userStore.address
    }
    else { // 未登录
      userInfo.avatar = 'https://tdesign.gtimg.com/mobile/demos/avatar1.png'
      userInfo.username = '小小轩'
      userInfo.tags[1].label = '深圳'
    }
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

  // 跳转数据中心
  function goToStat() {
    router.push('/statistics')
  }

  // 退出登录
  function logout() {
    userStore.logout()
    Toast({
      theme: 'success',
      message: '退出登录成功',
      duration: 2000,
    })
    // 可以跳转到首页或其他页面
    // router.replace('/')
  }

  const publishStatus = [
    { name: $t('pageMine.pubAll'), icon: () => h(FormIcon) },
    { name: $t('pageMine.pubReview'), icon: () => h(SearchIcon) },
    { name: $t('pageMine.pubPublish'), icon: () => h(UploadIcon) },
    { name: $t('pageMine.pubDrafts'), icon: () => h(FileCopyIcon) },
  ]
  const services = [
    { label: $t('pageMine.serWechat'), icon: wechat },
    { label: $t('pageMine.serQQ'), icon: qq },
    { label: $t('pageMine.serTDoc'), icon: tdoc },
    { label: $t('pageMine.serTMap'), icon: tmap },
    { label: $t('pageMine.serDataCenter'), icon: dataCenter, click: goToStat },
    { label: $t('pageMine.serDataCenter'), icon: dataCenter, click: goToStat },
    { label: $t('pageMine.serDataCenter'), icon: dataCenter, click: goToStat },
    { label: $t('pageMine.serDataCenter'), icon: dataCenter, click: goToStat },
  ]

  return {
    services,
    userInfo,
    loginStatus,
    publishStatus,
    goToEdit,
    goToLogin,
    goToSettings,
    logout,
  }
}
