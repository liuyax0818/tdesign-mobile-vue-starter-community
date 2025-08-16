<script setup lang='ts'>
const emits = defineEmits(['send'])

const msg = ref<string>('')

const allowSend = computed(() => {
  return msg.value.trim().length > 0
})

function handleSend() {
  if (!allowSend.value) {
    return
  }

  emits('send', msg.value)
}

function clearMsg() {
  msg.value = ''
}

defineExpose({ clearMsg })
</script>

<template>
  <div class="input-area flex">
    <t-textarea
      v-model="msg"
      bordered
      placeholder="请输入"
      :maxlength="1000"
      :autosize="{ minRows: 1, maxRows: 3 }"
    />

    <button class="send-btn" :class="[!allowSend && 'is-disabled']" @click="handleSend">
      发送
    </button>
  </div>
</template>

<style lang='scss' scoped>
.input-area {
  border-top: 0.5px solid #e7e7e7;
  background-color: #fff;
  padding: 12px;
  gap: 12px;
}

:deep(.t-textarea) {
  flex: 1;
  padding: 8px 16px;
  background-color: #f3f3f3;
  border-radius: 20px;
}

.send-btn {
  width: 64px;
  height: 40px;

  background: #0052d9;
  color: #fff;
  font-size: 16px;
  border-radius: 100px;
  border: none;
  opacity: 1;

  cursor: pointer;
  user-select: none;

  &.is-disabled {
    cursor: not-allowed;
    background: #b5c7ff;
  }
}
</style>
