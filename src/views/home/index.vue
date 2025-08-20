<script setup lang='ts'>
import { AddIcon } from 'tdesign-icons-vue-next'

import Card from './components/Card.vue'
import MiniSearch from './components/MiniSearch.vue'
import Swiper from './components/Swiper.vue'
import { useHomeHook } from './hooks'

const {
  activeTab,
  recomData,
  disRefresh,
  isRefreshing,
  goToSearch,
  goToPublish,
  handleScroll,
  handleRefresh,
} = useHomeHook()
</script>

<route lang="json5">
{
  meta: {
    title: '首页',
    showFooter: true
  }
}
</route>

<template>
  <div class="h-full">
    <Banner func="menu" :border="false">
      <template #title>
        <div class="w-full mx-[42px]">
          <MiniSearch @click="goToSearch" />
        </div>
      </template>
    </Banner>
    <t-tabs v-model="activeTab" size="large">
      <t-tab-panel value="recommend" label="推荐" />
      <t-tab-panel value="following" label="我的关注" />
    </t-tabs>
    <t-pull-down-refresh
      v-model="isRefreshing"
      :disabled="disRefresh"
      :loading-bar-height="56"
      :max-bar-height="100"
      :loading-texts="['下拉加载', '松开加载', '加载中', '加载完成']"
      @refresh="handleRefresh"
    >
      <div
        class="p-3 h-[calc(100%-48px)] overflow-y-auto flex flex-wrap justify-between"
        @scroll="handleScroll($event)"
      >
        <div v-for="item in recomData" :key="item.id">
          <Card
            v-if="item.type === 'card'"
            :img="item.img"
            :title="item.title"
            :tags="item.tags"
          />
          <Swiper v-else :imgs="item.imgs" />
        </div>
      </div>
    </t-pull-down-refresh>

    <t-fab
      text="发布"
      :y-bounds="[48, 72]"
      draggable="vertical"
      style="right: 16px; bottom: 72px;"
      @click="goToPublish"
    >
      <template #icon>
        <AddIcon size="24" />
      </template>
    </t-fab>
  </div>
</template>
