<script setup lang="ts">
import { useSearchLogic } from './hooks'
// 改为在hooks中引入
const {
  searchValue,
  historyTags,
  searchSuggestions,
  handleLeftClick,
  onSearchChange,
  onCancel,
  clearHistory,
  onHistoryTagClick,
  onSuggestionClick,
} = useSearchLogic()
</script>

<route lang="json5">
{
  meta: {
    title: '搜索页面',
    // 其他路由元信息
  }
}
</route>

<template>
  <div class="search-page h-full bg-white pb-0">
    <!--  固定的在顶部的导航栏 -->
    <Banner title="搜索" />
    <div v-if="false" class="navbar-container fixed top-0 left-0 right-0 z-50 bg-white">
      <t-navbar
        title="搜索"
        :fixed="true"
        left-arrow
        @left-click="handleLeftClick"
      />
    </div>

    <!-- 搜索输入模块 -->
    <div class="search-input-section bg-white p-2 px-4">
      <div class="search-input-container flex items-center gap-3 justify-between">
        <t-search
          v-model="searchValue"
          :clearable="true"
          shape="round"
          placeholder="请搜索你想要的内容"
          class="w-[296px] h-[40px] rounded-full bg-gray"
          @change="onSearchChange"
        />

        <t-button
          variant="text"
          theme="primary"
          class="w-[32px] h-[24px] text-left leading-[24px]"
          @click="onCancel"
        >
          取消
        </t-button>
      </div>
    </div>

    <!-- 历史记录模块 -->
    <div class="history-section bg-white p-4">
      <div class="section-header flex justify-between items-center mb-3">
        <span class="section-title text-lg font-semibold text-td-text-color-primary">历史记录</span>
        <t-icon
          name="delete"
          size="20px"
          class="cursor-pointer text-td-text-color-secondary hover:text-td-text-color-primary"
          @click="clearHistory"
        />
      </div>
      <div class="history-tags flex flex-wrap gap-2">
        <t-tag
          v-for="(tag, index) in historyTags"
          :key="`${tag}-${index}`"
          variant="dark"
          @click="onHistoryTagClick(tag)"
        >
          {{ tag }}
        </t-tag>
      </div>
    </div>

    <!-- 搜索发现模块 -->
    <div class="discovery-section bg-white p-4">
      <div class="section-header flex justify-between items-center mb-3">
        <span class="section-title text-lg font-semibold text-td-text-color-primary">搜索发现</span>
      </div>
      <div class="discovery-tags flex flex-col gap-2 items-start">
        <t-tag
          v-for="(suggestion, index) in searchSuggestions"
          :key="index"
          variant="light"
          theme="default"
          size="medium"
          class="whitespace-nowrap w-auto max-w-none"
          @click="onSuggestionClick(suggestion)"
        >
          {{ suggestion }}
        </t-tag>
      </div>
    </div>
  </div>
</template>
