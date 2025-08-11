<script setup lang='ts'>
import type { BannerProps } from './type'

import { ViewListIcon } from 'tdesign-icons-vue-next'

import Catalog from './Catalog.vue'
import { useBannerHook } from './hooks'

defineOptions({
  name: 'Banner',
})

const props = withDefaults(defineProps<BannerProps>(), {
  func: 'back',
})

const { openCatalog, handleLeftClick } = useBannerHook()
</script>

<template>
  <!-- TODO: v-bind="$attrs" 似乎不管用 -->
  <t-navbar
    :fixed="true"
    :title="props.title"
    :left-arrow="props.func === 'back'"
    v-bind="$attrs"
    @left-click="handleLeftClick(func)"
  >
    <template v-if="func === 'menu'" #left>
      <ViewListIcon size="20px" />
      <slot />
    </template>

    <template v-for="(val, name) in $slots" #[name]="soltData">
      <slot :name="name" v-bind="soltData || {}" />
    </template>
  </t-navbar>

  <t-popup v-model="openCatalog" placement="left" destroy-on-close>
    <Catalog />
  </t-popup>
</template>

<style lang='scss' scoped>

</style>
