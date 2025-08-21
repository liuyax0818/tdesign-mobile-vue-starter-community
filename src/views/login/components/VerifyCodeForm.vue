<script setup lang='ts'>
import { filterNonDigits } from '@/utils/value'

defineProps<{ phone: string }>()
const verCode = defineModel<string>()

const status = reactive({
  countdown: 60,
  isSend: false,
})

function onChange(val: string) {
  verCode.value = filterNonDigits(val)
}

let timer: NodeJS.Timeout = null
function onSend() {
  if (timer) {
    return
  }
  status.isSend = true
  status.countdown = 60
  timer = setInterval(() => {
    if (status.countdown === 1) {
      clearInterval(timer)
      timer = null
      status.isSend = false
    }
    status.countdown--
  }, 1000)
}

onMounted(() => {
  onSend()
},
)
</script>

<template>
  <div>
    <div class="mb-6 text-xs text-[#00000066]">
      验证码已通过短信发送至 {{ phone }}
    </div>
    <t-input v-model.trim="verCode" :maxlength="6" @change="onChange">
      <template #suffix>
        <div class="pl-4 h-[24px] border-l-[0.5px] border-l-[#e7e7e7]">
          <div
            v-if="!status.isSend"
            class="cursor-pointer text-[#0052D9]"
            @click="onSend"
          >
            发送验证码
          </div>
          <div v-else class="text-[#B5C7FF] cursor-not-allowed">
            {{ status.countdown }} 秒后重发
          </div>
        </div>
      </template>
    </t-input>
  </div>
</template>

<style lang='scss' scoped>
:deep() {
  --td-input-bg-color: transparent;
  --td-input-vertical-padding: 16px 0;
  --td-input-border-left-space: 0;
}
</style>
