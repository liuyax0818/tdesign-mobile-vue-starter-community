<script setup lang='ts'>
import type { BannerProps } from './type'

import { ChevronLeftIcon, ViewListIcon } from 'tdesign-icons-vue-next'

import Catalog from './Catalog.vue'
import { useBannerHook } from './hooks'

defineOptions({
  name: 'Banner',
})

withDefaults(defineProps<BannerProps>(), {
  title: '',
  func: 'back',
})

const { openCatalog, handleBack, handleOpenCatalog } = useBannerHook()
</script>

<template>
  <div class="banner-wrapper flex items-center">
    <div v-if="func !== 'none'" class="banner-func">
      <ViewListIcon v-if="func === 'menu'" @click="handleOpenCatalog" />
      <ChevronLeftIcon v-if="func === 'back'" @click="handleBack" />
    </div>

    <slot>
      <div class="banner-title w-full flex justify-center">
        {{ title }}
      </div>
    </slot>

    <!-- 保持左右对称 -->
    <div v-if="func !== 'none'" style="width: 24px;" />

    <t-popup v-model="openCatalog" placement="left" destroy-on-close>
      <Catalog />
    </t-popup>
  </div>
</template>

<style lang='scss' scoped>
.banner-wrapper {
  height: 48px;
  padding: 0 12px;
  background-color: #fff;

  .banner-func {
    color: #000;
    width: 24px;
    font-size: 20px;
    overflow: hidden;
  }

  .banner-title {
    font-size: 18px;
    font-weight: 600;
  }
}
</style>
