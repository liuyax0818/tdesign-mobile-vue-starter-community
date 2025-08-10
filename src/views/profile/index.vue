<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ChartLineIcon, CollectionIcon, CompassIcon, FormIcon, FrameIcon, LogoQqIcon, LogoWechatStrokeIcon, SearchIcon, UploadIcon } from 'tdesign-icons-vue-next'
import { Toast } from 'tdesign-mobile-vue'
import { h, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { useDrawerStore } from '@/store/drawer'
import { useUserStore } from '@/store/user'

const router = useRouter()
const drawerStore = useDrawerStore()
const { open } = drawerStore

const authStore = useAuthStore()
const { isAuthenticated, isLoading: authLoading, userId } = storeToRefs(authStore)
const { toggleLogin } = authStore

const userStore = useUserStore()
const { currentUser, isLoading: userLoading } = storeToRefs(userStore)

// 默认占位头像
const DEFAULT_AVATAR = '/avatars/placeholder.jpg'

// 监听认证状态变化，登录后获取用户信息
watchEffect(async () => {
  if (isAuthenticated.value && userId.value) {
    await userStore.fetchUser(userId.value)
  }
  else {
    userStore.clearUser()
  }
})

// 发布状态 - 使用 TDesign 图标
const publishStatus = ref([
  { name: '全部发布', icon: () => h(FormIcon), hover: true },
  { name: '审核中', icon: () => h(SearchIcon), hover: true },
  { name: '已发布', icon: () => h(UploadIcon), hover: true },
  { name: '草稿箱', icon: () => h(CollectionIcon), hover: true },
])

// 服务列表 - 使用 TDesign 图标
const services = ref([
  { name: '微信', icon: () => h(LogoWechatStrokeIcon), hover: true },
  { name: 'QQ', icon: () => h(LogoQqIcon), hover: true },
  { name: '腾讯文档', icon: () => h(FrameIcon), hover: true },
  { name: '腾讯地图', icon: () => h(CompassIcon) },
  { name: '数据中心', icon: () => h(ChartLineIcon), hover: true },
  { name: '数据中心', icon: () => h(ChartLineIcon), hover: true },
  { name: '数据中心', icon: () => h(ChartLineIcon), hover: true },
  { name: '数据中心', icon: () => h(ChartLineIcon), hover: true },
])

// 跳转编辑页面
function goToEdit() {
  if (!isAuthenticated.value) {
    Toast('请先登录')
    return
  }
  router.push('/profile/edit')
}

// 跳转设置页面
function goToSettings() {
  router.push('/profile/settings')
}
</script>

<template>
  <div class="profile-container">
    <!-- 导航栏 -->
    <t-navbar title="我的">
      <template #left>
        <div class="menu-btn" @click="open">
          <div class="menu-line" />
          <div class="menu-line" />
          <div class="menu-line" />
        </div>
      </template>
      <template #right>
        <t-button
          v-if="isAuthenticated"
          size="small"
          variant="text"
          :loading="authLoading"
          @click="toggleLogin"
        >
          退出
        </t-button>
      </template>
    </t-navbar>

    <div class="profile-content">
      <!-- 用户信息区域 -->
      <div class="user-section">
        <!-- 未登录状态 -->
        <div v-if="!isAuthenticated" class="auth-card" @click="toggleLogin">
          <t-avatar :image="DEFAULT_AVATAR" size="48px" />
          <div class="auth-text">
            <div class="auth-title">
              请先登录/注册
            </div>
          </div>
        </div>

        <!-- 已登录状态 -->
        <div v-else class="user-card">
          <div class="user-info">
            <t-avatar :image="currentUser?.avatar || DEFAULT_AVATAR" size="64px" />
            <div class="user-details">
              <div class="username">
                {{ currentUser?.name || '新用户' }}
                <t-icon
                  name="edit"
                  size="20px"
                  class="edit-icon"
                  @click="goToEdit"
                />
              </div>
              <div class="user-tags">
                <t-tag
                  v-if="currentUser?.bio"
                  theme="default"
                  variant="light"
                  size="small"
                  shape="square"
                >
                  {{ currentUser.bio }}
                </t-tag>
                <t-tag
                  v-if="currentUser?.location"
                  theme="default"
                  variant="light"
                  size="small"
                  shape="square"
                >
                  {{ currentUser.location }}
                </t-tag>
              </div>
            </div>
          </div>
        </div>

        <!-- 分割线 -->
        <t-divider />
        <!-- 发布状态 -->
        <t-grid :column="4" class="publish-grid">
          <t-grid-item
            v-for="item in publishStatus"
            :key="item.name"
            :text="item.name"
            :icon="item.icon"
            :hover="item.hover"
            @click="() => Toast(`点击了 ${item.name}`)"
          />
        </t-grid>
      </div>

      <!-- 推荐服务 -->
      <div class="service-section">
        <div class="section-title">
          推荐服务
        </div>
        <t-grid :column="4">
          <t-grid-item
            v-for="item in services"
            :key="item.name"
            :text="item.name"
            :icon="item.icon"
            :hover="item.hover"
            @click="() => Toast(`点击了 ${item.name}`)"
          />
        </t-grid>
      </div>

      <!-- 底部操作 -->
      <div class="action-section">
        <t-cell>
          <template #title>
            <div class="action-item">
              <t-icon name="service" size="20px" color="blue" />
              <span>联系客服</span>
            </div>
          </template>
          <template #right-icon>
            <t-icon name="chevron-right" size="20px" color="#999" />
          </template>
        </t-cell>
        <t-cell @click="goToSettings">
          <template #title>
            <div class="action-item">
              <t-icon name="setting" size="20px" color="blue" />
              <span>设置</span>
            </div>
          </template>
          <template #right-icon>
            <t-icon name="chevron-right" size="20px" color="#999" />
          </template>
        </t-cell>
      </div>
    </div>

    <!-- 底部导航栏 -->
    <t-tab-bar default-value="Profile">
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
  </div>
</template>

<style scoped>
/* 样式保持不变 */
.profile-container {
  position: relative;
  background-color: #f5f6f7;
  min-height: 100vh;
  padding-bottom: 60px;
}

.t-navbar {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #f5f6f7;
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

.profile-content {
  padding: 16px;
}

/* 用户信息区域 */
.user-section {
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

/* 未登录状态 */
.auth-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  cursor: pointer;
}

.auth-text {
  flex: 1;
}

.auth-title {
  font-size: 16px;
  font-weight: bold;
}

/* 已登录状态 */
.user-card {
  padding: 8px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-details {
  flex: 1;
}

.username {
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.user-tags {
  display: flex;
  gap: 8px;
}

.edit-icon {
  color: var(--td-brand-color);
  cursor: pointer;
}

/* 发布状态网格 */
.publish-grid {
  margin-top: 16px;
}

/* 分割线样式 */
.t-divider {
  margin: 16px 0;
}

/* 服务区块 */
.service-section,
.data-section {
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #333;
}

/* 网格布局 */
.t-grid {
  background-color: transparent;
}

/* 操作区块 */
.action-section {
  background-color: #fff;
  border-radius: 12px;
  margin-top: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.t-cell {
  padding: 16px;
}

.t-cell:first-child {
  border-bottom: 1px solid #f0f0f0;
}

.t-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.05);
  background-color: #fff;
}
</style>
