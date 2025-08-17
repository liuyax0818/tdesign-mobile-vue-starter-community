<script setup lang="ts">
import { useSearchLogic } from './hooks'

const {
  searchValue,
  historyTags,
  searchSuggestions,
  onSearchChange,
  onCancel,
  clearHistory,
  getSearchSuggList,
  onHistoryTagClick,
  onSuggestionClick,
} = useSearchLogic()

onMounted(() => {
  getSearchSuggList()
})
</script>

<route lang="json5">
{
  meta: {
    title: '搜索页面',
  }
}
</route>

<template>
  <div class="h-full overflow-y-auto bg-white">
    <!--  固定的在顶部的导航栏 -->
    <Banner title="搜索" />

    <!-- 搜索输入模块 -->
    <div class="p-2 px-4">
      <div class="flex items-center gap-3 justify-between">
        <t-search
          v-model="searchValue"
          focus
          clearable
          shape="round"
          :maxlength="20"
          placeholder="请搜索你想要的内容"
          class="flex-1 h-[40px]"
          @change="onSearchChange"
        />

        <button
          class="w-[32px] h-[24px] cursor-pointer border-none bg-transparent !text-[#0052D9]"
          @click="onCancel"
        >
          取消
        </button>
      </div>
    </div>

    <!-- 历史记录模块 -->
    <div class="p-4">
      <div class="section-header flex justify-between items-center mb-3">
        <span class="section-title text-lg font-semibold">历史记录</span>
        <t-icon
          name="delete"
          size="20px"
          class="cursor-pointer text-td-text-color-secondary"
          @click="clearHistory"
        />
      </div>
      <div class="history-tags flex flex-wrap gap-2">
        <t-tag
          v-for="(tag, index) in historyTags"
          :key="`${tag}-${index}`"
          variant="light"
          @click="onHistoryTagClick(tag)"
        >
          {{ tag }}
        </t-tag>
      </div>
    </div>

    <!-- 搜索发现模块 -->
    <div class="p-4">
      <div class="section-header flex justify-between items-center mb-3">
        <span class="text-lg font-semibold">搜索发现</span>
      </div>
      <div class="flex flex-col gap-2 items-start">
        <t-tag
          v-for="(suggestion, index) in searchSuggestions"
          :key="index"
          variant="light"
          class="max-w-full"
          @click="onSuggestionClick(suggestion)"
        >
          <template #icon>
            <t-icon name="search" />
          </template>
          {{ suggestion }}
        </t-tag>
      </div>
    </div>
  </div>
</template>
