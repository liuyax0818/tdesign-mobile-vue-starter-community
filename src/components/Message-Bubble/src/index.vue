<script setup lang="ts">
import { ref, watchEffect } from 'vue'

defineOptions({
  name: 'MessageBubble',
})

const props = defineProps({
  sender: {
    type: String as () => 'me' | 'contact',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  avatar: {
    type: Object as () => { src: string, alt: string },
    required: true,
  },
  size: {
    type: String,
    default: '40px',
  },
})

const emit = defineEmits(['error'])

const effectiveAvatar = ref(props.avatar)

function handleAvatarError() {
  effectiveAvatar.value = {
    src: '/avatars/placeholder.jpg',
    alt: '头像加载失败',
  }
  emit('error')
}

watchEffect(() => {
  effectiveAvatar.value = props.avatar
})
</script>

<template>
  <div class="message-item" :class="{ 'message-me': sender === 'me' }">
    <img
      v-if="sender === 'contact'"
      :src="effectiveAvatar.src"
      :alt="effectiveAvatar.alt"
      class="message-avatar"
      :style="{ width: size, height: size }"
      loading="lazy"
      @error="handleAvatarError"
    >

    <div class="message-content">
      <div class="message-bubble" :class="{ 'bubble-me': sender === 'me' }">
        {{ content }}
      </div>
      <div class="message-time" :class="{ 'time-me': sender === 'me' }">
        {{ time }}
      </div>
    </div>

    <img
      v-if="sender === 'me'"
      :src="effectiveAvatar.src"
      :alt="effectiveAvatar.alt"
      class="message-avatar message-avatar-me"
      :style="{ width: size, height: size }"
      loading="lazy"
      @error="handleAvatarError"
    >
  </div>
</template>

<style scoped>
.message-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;

  &.message-me {
    justify-content: flex-end;
  }
}

.message-avatar {
  flex-shrink: 0;
  border-radius: 50%;
  object-fit: cover;
  background-color: #f5f5f5;
  transition: opacity 0.3s ease;

  &:not(.message-avatar-me) {
    margin-right: 8px;
  }

  &.message-avatar-me {
    margin-left: 8px;
    border: 2px solid var(--td-brand-color);
  }
}

.message-content {
  max-width: calc(80% - 48px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  .message-me & {
    align-items: flex-end;
  }
}

.message-bubble {
  padding: 10px 14px;
  background-color: var(--ep-chat-bubble-bg-default);
  color: var(--ep-chat-text-default);
  line-height: 1.4;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: 4px;
  max-width: 100%;
  word-break: break-word;

  border-radius: 0 12px 12px 12px;

  &.bubble-me {
    background-color: var(--ep-chat-bubble-me-bg-active);
    border-radius: 12px 0 12px 12px;
  }
}

.message-time {
  font-size: 11px;
  color: var(--ep-chat-time-text-default);
  padding: 0 2px;

  &.time-me {
    text-align: right;
  }
}

@media (max-width: 480px) {
  .message-content {
    max-width: calc(85% - 48px);
  }

  .message-bubble {
    padding: 8px 12px;
    font-size: 15px;
  }

  .message-time {
    font-size: 10px;
  }
}
</style>
