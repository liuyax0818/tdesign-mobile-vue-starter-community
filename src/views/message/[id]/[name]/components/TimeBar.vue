<script setup lang='ts'>
import dayjs from 'dayjs'

defineProps<{
  time: dayjs.ConfigType
}>()
</script>

<template>
  <div class="w-full pt-2 text-center text-xs text-[#00000066]">
    {{ dayjs(time).format('HH:mm') }}
  </div>
</template>
