<script setup lang="ts">
// 发布页面逻辑
const router = useRouter()

// 发布内容
const content = ref('')
const files = ref([])

// 标签选项
const tags = ref([
  { label: '#AI绘画', checked: false },
  { label: '#版权素材', checked: false },
  { label: '#原创', checked: false },
  { label: '#风景', checked: false },
  { label: '#鬼畜', checked: false },
])

// 上传配置
const uploadConfig = {
  multiple: true,
  accept: 'image/*',
  action: '//service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo',
  max: 9,
  sizeLimit: { size: 3000000, unit: 'B' as const },
}

function handleLeftClick() {
  router.back()
}

function onValidate(context: any) {
  if (context.type === 'FILE_TYPE_ERROR') {
    TToast.show('文件类型错误，仅支持图片格式', { theme: 'error' })
  }
  else if (context.type === 'FILE_OVER_SIZE_LIMIT') {
    TToast.show('文件大小不能超过3MB', { theme: 'error' })
  }
}

function onPublish() {
  if (!content.value.trim() && files.value.length === 0) {
    return
  }

  // 发布成功后返回首页
  router.push('/')
}

function onSaveDraft() {
  // 保存草稿后返回首页
  router.push('/')
}

function onAddLocation() {

}

function onTagChange(index: number, checked: boolean) {
  tags.value[index].checked = checked
}
</script>

<template>
  <div class="h-full bg-white flex flex-col pb-20">
    <!-- 导航栏 - 固定在顶部 -->
    <div v-if="false" class="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4">
      <t-navbar
        title="发布动态"
        :fixed="true"
        left-arrow
        @left-click="handleLeftClick"
      />
    </div>
    <Banner title="发布动态" />
    <!-- [PERF] 仔细看 UI 中的分隔线，左侧有一段空白，是否考虑整体的容器存在左边距？ -->
    <!-- 图片上传区域 -->
    <div>
      <t-upload
        v-model="files"
        v-bind="uploadConfig"
        class="bg-transparent"
        @validate="onValidate"
      />
    </div>

    <!-- [PERF] 此处 UI 图里没有分割线 -->
    <t-divider />

    <!-- 添加描述区域 -->
    <!-- [PERF] 看看 UI 图的高度是多少呢 -->
    <div>
      <t-textarea
        v-model="content"
        name="content"
        label="添加描述"
        placeholder="分享你此刻的想法"
        :maxlength="500"
        indicator
        class="h-[100px]"
      />
    </div>

    <t-divider />

    <!-- 标签选择区域 -->
    <div class="px-4 py-2">
      <div class="flex items-center gap-8">
        <div class="text-base text-gray-800 flex items-center">
          添加标签
        </div>
        <!-- [PERF] 标签列表单行横向滚动，标签间隔 12px，仔细看 UI 图哇 -->
        <div class="flex flex-wrap gap-3 flex-1">
          <t-check-tag
            v-for="(tag, index) in tags"
            :key="index"
            v-model:checked="tag.checked"
            variant="dark"
            size="large"
            class="rounded-full text-sm h-8 px-4 border border-transparent transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
            @change="(checked) => onTagChange(index, checked)"
          >
            {{ tag.label }}
          </t-check-tag>
        </div>
      </div>
    </div>

    <t-divider />

    <!-- 位置信息 -->
    <div class="p-0">
      <t-cell title="所在位置" arrow @click="onAddLocation">
        <template #left-icon>
          <t-icon name="location" />
        </template>
      </t-cell>
    </div>

    <!-- 底部操作按钮 -->
    <!-- [PERF] UI 中有上边框吗 -->
    <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 px-4 z-50 flex gap-3">
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
