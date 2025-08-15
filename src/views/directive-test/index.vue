<script setup lang="ts">
import { useDirectiveTest } from './hooks'

defineOptions({
  name: 'DirectiveTest',
})

const {
  copyText,
  tapCount,
  longpressResult,
  swipeResult,
  handleTap,
  handleLongPress,
  handleSwipe,
} = useDirectiveTest()
</script>

<template>
  <div class="bg-gray-100 min-h-screen">
    <t-navbar title="指令测试" :left-arrow="true" />

    <div class="pt-15 px-4 pb-4">
      <!-- Copy 指令测试 -->
      <div class="bg-white p-4 mb-4 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-800 mb-3">
          📋 Copy 指令测试
        </h3>
        <t-input v-model="copyText" placeholder="修改文本内容" class="mb-3" />
        <t-button v-copy="copyText" size="small" theme="primary">
          复制文本
        </t-button>
        <p class="text-gray-500 text-xs mt-2">
          点击按钮复制文本，复制成功会在控制台显示
        </p>
      </div>

      <!-- Touch 指令测试 -->
      <div class="bg-white p-4 mb-4 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-800 mb-3">
          👆 Touch 指令测试
        </h3>

        <!-- 单独事件测试 -->
        <div class="space-y-4">
          <!-- 点击测试 -->
          <div class="border border-gray-200 rounded p-3">
            <p class="text-gray-600 text-sm mb-2">
              测试点击 (tap):
            </p>
            <p class="text-blue-600 text-xs mb-2 h-4">
              {{ tapCount > 0 ? `已点击 ${tapCount} 次` : '' }}
            </p>
            <div
              v-touch:tap="handleTap"
              class="bg-blue-100 p-4 rounded text-center text-blue-600 cursor-pointer hover:bg-blue-200 transition-colors"
            >
              点击这里
            </div>
          </div>

          <!-- 长按测试 -->
          <div class="border border-gray-200 rounded p-3">
            <p class="text-gray-600 text-sm mb-2">
              测试长按 (300ms):
            </p>
            <p class="text-green-600 text-xs mb-2 h-4">
              {{ longpressResult }}
            </p>
            <div
              v-touch:longpress="handleLongPress"
              class="bg-green-100 p-4 rounded text-center text-green-600 cursor-pointer hover:bg-green-200 transition-colors"
            >
              长按这里
            </div>
          </div>

          <!-- 滑动测试 -->
          <div class="border border-gray-200 rounded p-3">
            <p class="text-gray-600 text-sm mb-2">
              测试滑动 (上下左右):
            </p>
            <p class="text-purple-600 text-xs mb-2 h-4">
              {{ swipeResult }}
            </p>
            <div
              v-touch:swipe="handleSwipe"
              class="bg-purple-100 p-4 rounded text-center text-purple-600 cursor-pointer hover:bg-purple-200 transition-colors"
            >
              在这里滑动 (上/下/左/右)
            </div>
          </div>
        </div>
      </div>

      <!-- 使用说明 -->
      <div class="bg-white p-4 rounded-lg border-l-4 border-blue-500">
        <h4 class="text-gray-800 font-medium mb-2">
          💡 使用说明：
        </h4>
        <div class="text-gray-600 text-sm space-y-1">
          <p><strong>Copy 指令：</strong></p>
          <p>• v-copy="text" - 复制指定文本</p>

          <p class="mt-3">
            <strong>Touch 指令：</strong>
          </p>
          <p>• v-touch:tap="handler" - 点击事件</p>
          <p>• v-touch:longpress="handler" - 长按事件 (300ms)</p>
          <p>• v-touch:swipe="handler" - 滑动事件</p>
        </div>
      </div>
    </div>
  </div>
</template>
