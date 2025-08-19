<script setup lang='ts'>
import { Edit1Icon } from 'tdesign-icons-vue-next'

defineProps<{
  avatar?: string
  title: string
  tags: any[]
}>()
</script>

<template>
  <t-cell>
    <template #image>
      <t-avatar :image="avatar" size="64px" />
    </template>
    <template #rightIcon>
      <Edit1Icon size="20px" />
    </template>
    <template #title>
      <span class="font-semibold mt-[6px]">
        {{ title }}
      </span>
    </template>
    <template #description>
      <div class="flex gap-2">
        <t-tag v-for="item in tags" :key="item.label" variant="light">
          <template #icon>
            <t-icon :name="item.icon" size="12px" />
          </template>
          <span class="text-xs">
            {{ item.label }}
          </span>
        </t-tag>
      </div>
    </template>
  </t-cell>
</template>

<style lang='scss' scoped>

</style>
