<script setup lang='ts'>
const emits = defineEmits(['rev'])

function revPwd() {
  emits('rev')
}
</script>

<template>
  <div class="text-xs">
    <span>忘记密码？</span>
    <span class="text-[#0052D9] cursor-pointer" @click="revPwd">
      找回密码
    </span>
  </div>
</template>
