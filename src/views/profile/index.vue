<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Toast } from 'tdesign-mobile-vue'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { useDrawerStore } from '@/store/drawer'

const router = useRouter()
const drawerStore = useDrawerStore()
const { open } = drawerStore

const authStore = useAuthStore()
const { user, isAuthenticated } = storeToRefs(authStore)

const DEFAULT_PROFILE = {
  name: '小小轩',
  bio: '天秤星',
  location: '深圳',
  avatar: 'https://picsum.photos/80/80?random=1',
}

const userInfo = computed(() => ({
  name: user.value?.name || DEFAULT_PROFILE.name,
  bio: user.value?.bio || DEFAULT_PROFILE.bio,
  location: user.value?.location || DEFAULT_PROFILE.location,
  avatar: user.value?.avatar || DEFAULT_PROFILE.avatar,
}))

const stats = ref({ works: 102, followers: 202, likes: 233 })
const services = ref([
  { name: '微信', icon: 'wechat' },
  { name: 'QQ', icon: 'qq' },
  { name: '腾讯文档', icon: 'document' },
  { name: '腾讯地图', icon: 'location' },
])

const dataCenters = ref(['创作数据', '互动数据', '收益数据', '成长数据'])

function goToEdit() {
  if (!isAuthenticated.value) {
    Toast({
      message: '请先登录',
      duration: 1500,
    })
    return
  }
  router.push('/profile/edit')
}

function navigateToDataCenter(item: string) {
  if (!isAuthenticated.value) {
    Toast({
      message: '请先登录',
      duration: 1500,
    })
    return
  }

  if (item === '成长数据') {
    router.push('/analytics')
  }
  else {
    Toast({
      message: `进入${item}中心`,
      duration: 1500,
    })
  }
}

function navigateToService(service: string) {
  Toast({
    message: `打开${service}`,
    duration: 1500,
  })
}
</script>

<template>
  <t-navbar title="我的">
    <template #left>
      <div class="menu-btn" @click="open">
        <div class="menu-line" />
        <div class="menu-line" />
        <div class="menu-line" />
      </div>
    </template>
  </t-navbar>

  <div class="profile-container">
    <t-cell-group v-if="!isAuthenticated">
      <t-cell>
        <template #title>
          请先登录/注册
        </template>
        <template #right-icon>
          <t-button size="small" theme="primary" @click="router.push('/login')">
            登录/注册
          </t-button>
        </template>
      </t-cell>
    </t-cell-group>

    <div v-else>
      <t-cell-group>
        <t-cell>
          <template #title>
            <div class="user-info">
              <t-avatar :image="userInfo.avatar" size="64px" />
              <div class="user-details">
                <div class="username">
                  {{ userInfo.name }}
                </div>
                <div class="user-bio">
                  {{ userInfo.bio }}
                </div>
                <div class="user-location">
                  <t-icon name="location" size="16px" />
                  {{ userInfo.location }}
                </div>
              </div>
              <t-icon
                name="edit"
                size="20px"
                class="edit-icon"
                @click="goToEdit"
              />
            </div>
          </template>
        </t-cell>
      </t-cell-group>

      <t-cell-group>
        <t-cell title="作品" :note="String(stats.works)">
          <template #left-icon>
            <t-tag theme="primary" variant="light">
              新
            </t-tag>
          </template>
        </t-cell>
        <t-cell title="粉丝" :note="String(stats.followers)" />
        <t-cell title="获赞" :note="String(stats.likes)" />
      </t-cell-group>
    </div>

    <t-cell-group title="全部发布">
      <t-tabs default-value="2" placement="top">
        <t-tab-panel value="1" label="审核中" />
        <t-tab-panel value="2" label="已发布" />
        <t-tab-panel value="3" label="草稿箱" />
      </t-tabs>
    </t-cell-group>

    <t-cell-group title="推荐服务">
      <t-grid :column="4" border hover>
        <t-grid-item
          v-for="service in services"
          :key="service.name"
          :text="service.name"
          @click="navigateToService(service.name)"
        >
          <t-icon :name="service.icon" size="24px" />
        </t-grid-item>
      </t-grid>
    </t-cell-group>

    <t-cell-group title="数据中心">
      <t-grid :column="4" border hover>
        <t-grid-item
          v-for="(item, index) in dataCenters"
          :key="`data-${index}`"
          :text="item"
          @click="navigateToDataCenter(item)"
        >
          <t-icon name="chart" size="24px" />
        </t-grid-item>
      </t-grid>
    </t-cell-group>

    <t-cell-group>
      <t-cell title="联系客服" arrow @click="router.push('/customer-service')" />
      <t-cell title="设置" arrow @click="router.push('/settings')" />
    </t-cell-group>
  </div>

  <t-tab-bar default-value="Profile" class="bottom-tab-bar">
    <t-tab-bar-item name="Home" @click="router.push('/')">
      <template #icon>
        <t-icon name="home" />
      </template>
      首页
    </t-tab-bar-item>
    <t-tab-bar-item name="Messages" @click="router.push('/messages')">
      <template #icon>
        <t-icon name="mail" />
      </template>
      消息
    </t-tab-bar-item>
    <t-tab-bar-item name="Profile" @click="router.push('/profile')">
      <template #icon>
        <t-icon name="user" />
      </template>
      我的
    </t-tab-bar-item>
  </t-tab-bar>
</template>

<style scoped>
.profile-container {
  padding: 16px;
  padding-top: 44px;
  padding-bottom: 80px;
  background-color: #f7f8fa;
}

.menu-btn {
  margin-left: 12px;
  width: 24px;
  height: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}

.menu-line {
  width: 100%;
  height: 2px;
  background-color: currentColor;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.username {
  font-weight: bold;
  font-size: 18px;
}

.user-bio {
  color: #666;
  font-size: 14px;
}

.user-location {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #999;
  font-size: 12px;
}

.edit-icon {
  position: absolute;
  right: 0;
  top: 0;
  color: var(--td-brand-color);
  cursor: pointer;
}

.bottom-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

.t-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.t-cell-group__title {
  font-size: 16px;
  font-weight: bold;
  padding: 16px 16px 8px;
}

.t-tabs {
  padding: 0 16px;
}
</style>
