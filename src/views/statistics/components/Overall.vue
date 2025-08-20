<script setup lang='ts'>
import dayjs from 'dayjs'

defineProps<{
  time: dayjs.ConfigType
  data: { label: string, value: number, light?: boolean }[]
}>()

function formatValue(val: number): string {
  const unit = ['k', 'w', 'e']

  let displayVal: number = val
  let displayUnit: string = ''

  if (val < 1000) {
    displayVal = val
  }
  else if (val < 10000) {
    displayVal = Number((val / 1000).toFixed(1))
    displayUnit = unit[0]
  }
  else if (val < 100000000) {
    displayVal = Number((val / 10000).toFixed(1))
    displayUnit = unit[1]
  }
  else {
    displayVal = Number((val / 100000000).toFixed(1))
    displayUnit = unit[2]
  }

  return `${displayVal}${displayUnit}`
}
</script>

<template>
  <div class="w-full bg-white p-4 h-[120px]">
    <div class="flex justify-between items-center mb-4">
      <div class="text-base font-semibold">
        整体情况
      </div>
      <div class="text-xs text-[#00000066]">
        截止{{ dayjs(time).format('HH:mm') }}累计数值
      </div>
    </div>
    <div class="flex justify-between">
      <div v-for="item in data" :key="item.label" class="min-w-[100px]">
        <div class="text-xs text-[#00000066]">
          {{ item.label }}
        </div>
        <div class="text-2xl font-semibold" :class="item?.light && 'text-[#0052D9]'">
          {{ formatValue(item.value) }}
        </div>
      </div>
    </div>
  </div>
</template>
