<script setup lang="ts">
// [PERF] script 里面的逻辑太多，是否考虑将其提取至一个 hook 里呢？
// 搜索页面逻辑
const router = useRouter()
const searchValue = ref('')

// 历史记录数据
const historyTags = ref([
  'AI绘画',
  'Stable Diffusion',
  '版权素材',
  '星空',
  'Illustration',
  'AI绘画',
])

// 搜索发现数据
const searchSuggestions = ref([
  '科比大战布莱恩特',
  '喜欢马嘉祺的7种特征，看看你中了几个',
  '滑雪大冒险的兵来了！哈基米音乐登场',
  '小时候看这集吃成大伟带了',
  '爆了！嘉然锐评虚环PV中自己的画：画得很可爱！',
  '把我放在唐代肯定比过苏轼',
  '天津美食吃法之剩包子篇',
])

function handleLeftClick() {
  router.back()
}

function onSearchChange(value: string) {
  searchValue.value = value
}

function onCancel() {
  searchValue.value = ''
  router.back()
}

function clearHistory() {
  historyTags.value = []
}

function onHistoryTagClick(tag: string) {
  searchValue.value = tag
}

function onSuggestionClick(suggestion: string) {
  searchValue.value = suggestion
}
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
    <!-- 导航栏 - 固定在顶部 -->
    <Banner title="搜索" />
    <div v-if="false" class="navbar-container fixed top-0 left-0 right-0 z-50 bg-white">
      <t-navbar
        title="搜索"
        :fixed="true"
        left-arrow
        @left-click="handleLeftClick"
      />
    </div>

    <!-- 搜索输入区域 -->
    <div class="search-input-section bg-white p-2 px-4">
      <div class="search-input-container flex items-center gap-3 justify-between">
        <!-- [PERF] 设计图画布宽 375px 搜索框 296px，这个长度对么，长度是否应该跟着屏幕宽度而变化 -->
        <t-search
          v-model="searchValue"
          :clearable="true"
          shape="round"
          placeholder="请搜索你想要的内容"
          class="flex-grow"
          @change="onSearchChange"
        />
        <!-- [PERF] 这个是文本还是按钮呢 🤔 -->
        <t-button
          variant="text"
          theme="primary"
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
