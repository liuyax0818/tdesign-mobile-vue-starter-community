<script setup lang="ts">
// 发布页面逻辑
import { usePublish } from './hooks'

const {
  content,
  files,
  tags,
  uploadConfig,
  handleLeftClick,
  onValidate,
  onPublish,
  onSaveDraft,
  onAddLocation,
  onTagChange,
} = usePublish()
</script>优化发布界面UI

<template>
  <div class="min-h-screen bg-white flex flex-col pt-12 pb-20">
    <!-- 固定在顶部的导航栏 -->
    <div class="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4">
      <t-navbar
        title="发布动态"
        :fixed="true"
        left-arrow
        @left-click="handleLeftClick"
      />
    </div>

    <!-- 图片上传模块 -->
    <div>
      <t-upload
        v-model="files"
        v-bind="uploadConfig"
        class="bg-transparent"
        @validate="onValidate"
      />
    </div>

    <!-- 添加描述模块 -->
    <div>
      <t-textarea
        v-model="content"
        name="content"
        label="添加描述"
        placeholder="分享你此刻的想法"
        :maxlength="500"
        indicator
        class="bg-transparent h-[132px]"
      />
    </div>

    <t-divider class="ml-4" />

    <!-- 标签选择模块 -->
    <div class="px-4 py-2">
      <div class="flex items-center gap-8">
        <div class="text-base text-gray-800 flex items-center">
          添加标签
        </div>
        <div class="flex overflow-x-auto gap-3 flex-1 tag-container">
          <t-check-tag
            v-for="(tag, index) in tags"
            :key="index"
            v-model:checked="tag.checked"
            variant="dark"
            size="large"
            class="rounded-full text-sm h-8 px-4 border border-transparent transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm flex-shrink-0"
            @change="(checked) => onTagChange(index, checked)"
          >
            {{ tag.label }}
          </t-check-tag>
        </div>
      </div>
    </div>
    <!-- 这间隙有点盯帧了 -->
    <t-divider class="ml-4" />

    <!-- 位置信息模块 -->
    <div class="p-0">
      <t-cell title="所在位置" arrow @click="onAddLocation">
        <template #left-icon>
          <t-icon name="location" />
        </template>
      </t-cell>
    </div>

    <t-divider class="ml-4" />

    <!-- 底部操作按钮模块 -->
    <div class="fixed bottom-0 left-0 right-0 bg-white p-4 px-4 z-50 flex gap-3">
      <t-button size="large" theme="light" class="flex-1" @click="onSaveDraft">
        <t-icon name="file-copy" size="22px" />
        存草稿
      </t-button>
      <t-button size="large" theme="primary" class="flex-1" @click="onPublish">
        <t-icon name="upload" size="22px" />
        发布
      </t-button>
    </div>
  </div>
</template>

<style lang='scss' scoped>
/* 实现标签选择模块在滑动标签时隐藏滚动条 */
.tag-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.tag-container {
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
