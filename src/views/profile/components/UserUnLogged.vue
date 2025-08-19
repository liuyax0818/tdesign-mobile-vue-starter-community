<script setup lang='ts'>
import { UserIcon } from 'tdesign-icons-vue-next'
</script>

<template>
  <div class="w-full p-4 flex items-center">
    <!-- 使用 t-cell 显得有点复杂化了 -->
    <t-avatar size="64px">
      <template #icon>
        <UserIcon size="32px" />
      </template>
    </t-avatar>
    <div class="flex-1 pl-4 font-semibold">
      请先登录/注册
    </div>
  </div>
</template>
