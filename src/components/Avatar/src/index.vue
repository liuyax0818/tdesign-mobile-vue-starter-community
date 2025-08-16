<script setup lang="ts">
// 头像组件，支持加载失败时显示占位图
// 支持自定义大小和样式
import { ref, watchEffect } from 'vue'

defineOptions({
  name: 'Avatar',
})

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: '用户头像',
  },
  size: {
    type: String,
    default: '48px',
  },
  isMe: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['error'])

const effectiveSrc = ref(props.src)

function handleError() {
  effectiveSrc.value = '/avatars/placeholder.jpg'
  emit('error')
}

watchEffect(() => {
  effectiveSrc.value = props.src
})
</script>

<template>
  <img
    :src="src"
    :alt="alt"
    class="avatar"
    :class="{ 'avatar-me': isMe }"
    :style="{ width: size, height: size }"
    loading="lazy"
    @error="handleError"
  >
</template>

<style scoped>
.avatar {
  border-radius: 50%;
  object-fit: cover;
  background-color: #f5f5f5;
  transition: opacity 0.3s ease;
}

.avatar-me {
  border: 2px solid var(--td-brand-color);
}
</style>
