<script setup lang="ts">
defineOptions({
  name: 'DirectiveTest',
})

const copyText = ref('这是一个动态文本，可以被复制')
const userInfo = ref({
  id: '123456',
  name: '张三',
  phone: '13888888888',
})
</script>

<template>
  <div class="bg-gray-100 min-h-screen">
    <t-navbar title="Copy指令测试" :left-arrow="true" />

    <div class="pt-15 px-4 pb-4">
      <h3 class="text-lg font-semibold text-gray-800 mb-5">
        📋 复制指令测试
      </h3>

      <!-- 测试1: 复制固定文本 -->
      <div class="bg-white p-4 mb-4 rounded-lg">
        <p class="text-gray-600 font-medium mb-3 text-sm">
          测试1: 复制固定文本
        </p>
        <t-button v-copy="'Hello World!'" size="small">
          点击复制 "Hello World!"
        </t-button>
      </div>

      <!-- 测试2: 复制动态文本 -->
      <div class="bg-white p-4 mb-4 rounded-lg">
        <p class="text-gray-600 font-medium mb-3 text-sm">
          测试2: 复制动态文本
        </p>
        <t-input v-model="copyText" placeholder="修改这里的文本" class="mb-3" />
        <t-button v-copy="copyText" size="small" theme="primary">
          复制上面的文本
        </t-button>
      </div>

      <!-- 测试3: 复制元素内容 -->
      <div class="bg-white p-4 mb-4 rounded-lg">
        <p class="text-gray-600 font-medium mb-3 text-sm">
          测试3: 复制元素内容
        </p>
        <div v-copy class="p-3 bg-gray-100 rounded cursor-pointer text-center text-gray-600 hover:bg-gray-200 transition-colors">
          点击这个区域复制它的文本内容
        </div>
      </div>

      <!-- 测试4: 复制用户信息 -->
      <div class="bg-white p-4 mb-4 rounded-lg">
        <p class="text-gray-600 font-medium mb-3 text-sm">
          测试4: 复制用户信息
        </p>
        <div class="bg-gray-50 p-3 rounded mb-3">
          <div class="mb-1 text-sm">
            ID: {{ userInfo.id }}
          </div>
          <div class="mb-1 text-sm">
            姓名: {{ userInfo.name }}
          </div>
          <div class="mb-1 text-sm">
            电话: {{ userInfo.phone }}
          </div>
        </div>
        <div class="flex gap-2">
          <t-button v-copy="userInfo.id" size="small" variant="outline">
            复制ID
          </t-button>
          <t-button v-copy="userInfo.phone" size="small" variant="outline">
            复制电话
          </t-button>
        </div>
      </div>

      <!-- 使用说明 -->
      <div class="bg-white p-4 rounded-lg border-l-4 border-blue-500">
        <h4 class="text-gray-800 font-medium mb-2">
          💡 使用说明：
        </h4>
        <p class="text-gray-600 text-sm mb-1">
          1. 点击按钮后，内容会复制到剪贴板
        </p>
        <p class="text-gray-600 text-sm mb-1">
          2. 可以在其他地方粘贴（Ctrl+V）来验证
        </p>
        <p class="text-gray-600 text-sm">
          3. 复制成功会在控制台显示日志
        </p>
      </div>
    </div>
  </div>
</template>
