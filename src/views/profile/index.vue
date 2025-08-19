<script setup lang="ts">
import UserLogged from './components/UserLogged.vue'
import UserUnLogged from './components/UserUnLogged.vue'
import { useProfileHook } from './hooks'

const {
  services,
  userInfo,
  loginStatus,
  publishStatus,
  goToEdit,
  goToLogin,
  goToSettings,
} = useProfileHook()
</script>

<route lang="json5">
{
  meta: {
    title: '个人资料',
    showFooter: true,
    showBackground: true
  }
}
</route>

<template>
  <div class="h-full">
    <!-- 导航栏 -->
    <Banner title="我的" func="menu" :border="false" transparent />

    <div class="h-full pb-4 overflow-y-auto">
      <div class="t-cell-group--card bg-white !mb-4">
        <UserLogged
          v-if="loginStatus"
          :avatar="userInfo.avatar"
          :title="userInfo.username"
          :tags="userInfo.tags"
          @click="goToEdit"
        />
        <UserUnLogged v-else @click="goToLogin" />

        <t-divider class="!m-0" />

        <t-grid class="publish-area py-4" :column="4">
          <t-grid-item
            v-for="(item, index) in publishStatus"
            :key="index"
            :text="item.name"
            :icon="item.icon"
          />
        </t-grid>
      </div>

      <div class="t-cell-group--card bg-white !mb-4">
        <div class="text-sm font-semibold mt-4 ml-5">
          推荐服务
        </div>

        <t-grid :column="4">
          <t-grid-item
            v-for="(item, index) in services"
            :key="index"
            :text="item.label"
            :image="item.icon"
          />
        </t-grid>
      </div>

      <t-cell-group theme="card">
        <t-cell title="联系客服" arrow>
          <template #leftIcon>
            <t-icon name="service" size="22px" />
          </template>
        </t-cell>
        <t-cell title="设置" arrow @click="goToSettings">
          <template #leftIcon>
            <t-icon name="setting" size="22px" />
          </template>
        </t-cell>
      </t-cell-group>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.publish-area {
  :deep(.t-grid-item) {
    padding: 0;
    font-size: 22px;

    &:nth-child(1) {
      border-right: 1px solid #e7e7e7;
    }
  }
}
</style>
