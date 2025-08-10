<script setup lang='ts'>
import { useLayoutHook } from './hooks'

defineOptions({
  name: 'Layout',
})

const { locale, layoutStore, localeState, localeOptions, t, add, onConfirm } = useLayoutHook()
</script>

<template>
  <div class="layout-wrapper">
    <h3 class="!mb-4">
      layout
    </h3>
    <div class="mb-2">
      Current Language: {{ locale }}
    </div>
    <div class="mb-2">
      {{ t('global.title') }}
    </div>
    <t-cell class="mb-2 rounded-md" arrow title="Select Language" @click="localeState.show = true" />
    <t-popup v-model="localeState.show" placement="bottom">
      <t-picker
        v-model="localeState.locale"
        :columns="localeOptions"
        @confirm="onConfirm"
        @cancel="localeState.show = false"
      >
        <template #option="item">
          {{ item.label }}
        </template>
      </t-picker>
    </t-popup>
    <t-button theme="primary" size="small" @click="add">
      Count: {{ layoutStore.count }}
    </t-button>

    <t-divider content="华丽的分割线 -- 以下是二级路由的内容" align="left" />
    <router-view />
  </div>
</template>

<style lang='scss' scoped>
.layout-wrapper {
  background-color: var(--tmv-bg-color);
}
</style>
