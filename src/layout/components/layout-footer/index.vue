<script setup lang='tsx'>
import type { FooterMenuProp } from './types'

import { ChatIcon, HomeIcon, UserIcon } from 'tdesign-icons-vue-next'

import { getUnReadCountApi } from '@/api/message'
import FooterMenu from './FooterMenu.vue'

defineOptions({
  name: 'LayoutFooter',
})

const route = useRoute()
const router = useRouter()

const menuList = reactive<FooterMenuProp[]>([
  {
    path: '/home',
    label: '首页',
    icon: <HomeIcon />,
  },
  {
    path: '/message',
    label: '消息',
    icon: <ChatIcon />,
    badge: 0,
  },
  {
    path: '/profile',
    label: '我的',
    icon: <UserIcon />,
  },
])

function changeMenu(val: FooterMenuProp) {
  if (route.path === val.path) {
    return
  }
  router.push(val.path)
}

/** 更新未读数量 */
function updateUnCount() {
  getUnReadCountApi().then((res) => {
    menuList[1].badge = res.data
  })
}

onMounted(() => {
  updateUnCount()
})
</script>

<template>
  <footer class="layout-footer w-full flex justify-between select-none">
    <FooterMenu
      v-for="(item) in menuList"
      :key="item.path"
      v-bind="item"
      :active="route.path === item.path"
      @click="changeMenu(item)"
    />
  </footer>
</template>

<style lang='scss' scoped>
.layout-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 56px;
  padding: 8px;
  gap: 8px;
  background: #fff;
}
</style>
