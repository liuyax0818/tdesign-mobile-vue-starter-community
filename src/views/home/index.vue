<script setup lang="ts">
import { useHomepage } from './hooks'

const {
  activeTab,
  isRefreshing,
  currentCards,
  onTabChange,
  onCardClick,
  handleRefresh,
  route,
  iconFunc,
  onPublishClick,
  swiperList,
} = useHomepage()
</script>

<template>
  <div class="min-h-screen bg-gray-100 overflow-x-hidden">
    <!-- 切换页模块 -->
    <t-tabs v-model="activeTab" class="sticky top-0 z-999 bg-white px-4 border-b border-gray-200" @change="onTabChange">
      <t-tab-panel value="recommend" label="推荐" class="font-medium" />
      <t-tab-panel value="following" label="我的关注" class="font-medium" />
    </t-tabs>
    <!-- 下拉刷新模块 -->
    <t-pull-down-refresh
      v-model="isRefreshing"
      :loading-bar-height="56"
      :max-bar-height="100"
      :loading-texts="['下拉加载', '松开加载', '加载中', '加载完成']"
      class="flex items-center justify-center"
      content-class="flex flex-col items-center justify-center"
      indicator-class="flex flex-col items-center justify-center"
      @refresh="handleRefresh"
    >
      <div class="p-4">
        <!-- 卡片网格模块，具有两种不同卡片 -->
        <div class="grid grid-cols-2 gap-[16px]">
          <!-- 轮播图卡片大小，自适应布局 -->
          <div class="rounded-[9px] overflow-hidden shadow-md bg-white h-[241px] grid-col-span-2">
            <!-- 内部导航器 -->
            <TSwiper :autoplay="true" height="241px" :navigation="{ type: 'dots-bar', placement: 'bottom', offset: [0, -10] }" class="w-full h-full">
              <TSwiperItem v-for="(item, index) in swiperList" :key="index">
                <img :src="item" class="img w-full h-full object-cover">
              </TSwiperItem>
            </TSwiper>
          </div>

          <!-- 普通卡片模块，采用自适应布局 -->
          <div
            v-for="card in currentCards"
            :key="card.id"
            class="bg-white rounded-[9px] overflow-hidden shadow-md transition-transform duration-200 active:scale-98 cursor-pointer h-[241px] opacity-100"
            @click="onCardClick(card)"
          >
            <div class="w-full h-2/3">
              <img :src="card.image" class="img w-full h-full object-cover" :alt="card.title">
            </div>
            <div class="p-3">
              <div class="text-sm font-semibold text-gray-800 mb-1 truncate">
                {{ card.title }}
              </div>
              <div class="mt-2">
                <!-- 普通卡片的标签 -->
                <t-tag
                  :content="card.tag1"
                  size="small"
                  variant="light"
                  theme="primary"
                  class="bg-gray-100 text-gray-600"
                />
                <t-tag
                  :content="card.tag2"
                  size="small"
                  variant="light"
                  theme="success"
                  class="bg-gray-100 text-gray-600 ml-[12px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </t-pull-down-refresh>

    <!-- 跳转发布按钮，移到下拉刷新组件外部以确保固定定位生效 -->
    <div v-if="route.path === '/homepage'" class="fixed bottom-8 right-8 z-999">
      <t-fab
        :icon="iconFunc"
        text="发布"
        class="w-[100px] h-[48px] rounded-[24px] opacity-100 bg-[#0052d9] shadow-[0_3px_14px_2px_rgba(0,0,0,0.05),_0_8px_10px_1px_rgba(0,0,0,0.06),_0_5px_5px_-3px_rgba(0,0,0,0.1)]"
        @click="onPublishClick"
      />
    </div>
  </div>
</template>
