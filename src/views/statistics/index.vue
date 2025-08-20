<script setup lang='ts'>
import Area from './components/Area.vue'
import CompleRate from './components/CompleRate.vue'
import Interaction from './components/Interaction.vue'
import Overall from './components/Overall.vue'
import { useStatisticsHook } from './hooks'

const { overallData, interData, compList, areaData } = useStatisticsHook()
</script>

<template>
  <div class="h-full">
    <Banner title="数据中心" />
    <div class="h-full overflow-y-auto">
      <Overall :data="overallData.data" :time="overallData.update" />
      <Interaction :data="interData" class="!my-4" />
      <CompleRate :data="compList" class="!my-4" />
      <Area :data="areaData" class="!my-4" />
    </div>
  </div>
</template>
