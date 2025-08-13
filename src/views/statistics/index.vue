<script setup lang="ts">
import { useStatisticsLogic } from './hooks'

const {
  handleLeftClick,
  overallStats,
  interactionStats,
  completionData,
  regionData,
  columns,
} = useStatisticsLogic()
</script>

<template>
  <div class="min-h-screen bg-gray-100 pt-12">
    <!-- 固定在顶部仅有返回功能的导航栏 -->
    <t-navbar
      title="数据中心"
      left-arrow
      class="bg-white border-b border-gray-200"
      :fixed="true"
      @left-click="handleLeftClick"
    />

    <div class="px-4 pb-4">
      <!-- 整体情况模块，已扣 -->
      <div class="bg-white px-4 py-4 -mx-4 mb-4">
        <div class="flex justify-between items-center mb-4">
          <div class="text-lg font-semibold text-gray-900">
            整体情况
          </div>
          <div class="w-[102px] h-[20px] opacity-100 text-[#00000066] text-xs font-normal font-['PingFang_SC'] text-left leading-[20px]">
            截止12:00累计数值
          </div>
        </div>
        <div class="flex justify-between">
          <div class="flex-1 text-center">
            <div class="w-[36px] h-[20px] text-gray-500 text-xs font-normal font-['PingFang_SC'] text-left leading-[20px] mb-1">
              浏览量
            </div>
            <div class="w-[62px] h-[32px] text-[#0052d9] text-2xl font-semibold font-['PingFang_SC'] text-left leading-[32px]">
              {{ overallStats.views }}
            </div>
          </div>
          <div class="flex-1 text-center">
            <div class="w-[36px] h-[20px] text-gray-500 text-xs font-normal font-['PingFang_SC'] text-left leading-[20px] mb-1">
              PV
            </div>
            <div class="w-[62px] h-[32px] text-[#000000e6] text-2xl font-semibold font-['PingFang_SC'] text-left leading-[32px]">
              {{ overallStats.likes }}
            </div>
          </div>
          <div class="flex-1 text-center">
            <div class="w-[36px] h-[20px] text-gray-500 text-xs font-normal font-['PingFang_SC'] text-left leading-[20px] mb-1">
              UV
            </div>
            <div class="w-[62px] h-[32px] text-[#000000e6] text-2xl font-semibold font-['PingFang_SC'] text-left leading-[32px]">
              {{ overallStats.shares }}
            </div>
          </div>
        </div>
      </div>

      <!-- 互动情况模块，已扣 -->
      <div class="bg-white rounded-lg p-4 mb-4">
        <div class="text-base font-semibold mb-4 text-gray-900">
          互动情况
        </div>
        <div class="flex justify-start">
          <!-- 浏览量 -->
          <div class="flex-1 text-left flex flex-col items-start">
            <div class="text-[#00000066] text-[10px] font-normal font-['PingFang_SC'] mb-1">
              浏览量
            </div>
            <div class="flex items-baseline justify-center space-x-1">
              <div class="text-[#000000e6] text-xl font-semibold font-['PingFang_SC']">
                {{ interactionStats.views }}
              </div>
              <div class="text-[#00000099] text-[10px] font-normal font-['PingFang_SC']">
                次
              </div>
            </div>
          </div>

          <!-- 点赞量 -->
          <div class="flex-1 text-left flex flex-col items-start">
            <div class="text-[#00000066] text-[10px] font-normal font-['PingFang_SC'] mb-1">
              点赞量
            </div>
            <div class="flex items-baseline justify-center space-x-1">
              <div class="text-[#000000e6] text-xl font-semibold font-['PingFang_SC']">
                {{ interactionStats.likes }}
              </div>
              <div class="text-[#00000099] text-[10px] font-normal font-['PingFang_SC']">
                次
              </div>
            </div>
          </div>

          <!-- 分享量 -->
          <div class="flex-1 text-left flex flex-col items-start">
            <div class="text-[#00000066] text-[10px] font-normal font-['PingFang_SC'] mb-1">
              分享量
            </div>
            <div class="flex items-baseline justify-center space-x-1">
              <div class="text-[#000000e6] text-xl font-semibold font-['PingFang_SC']">
                {{ interactionStats.shares }}
              </div>
              <div class="text-[#00000099] text-[10px] font-normal font-['PingFang_SC']">
                次
              </div>
            </div>
          </div>

          <!-- 收藏 -->
          <div class="flex-1 text-left flex flex-col items-start">
            <div class="text-[#00000066] text-[10px] font-normal font-['PingFang_SC'] mb-1">
              收藏
            </div>
            <div class="flex items-baseline justify-center space-x-1">
              <div class="text-[#000000e6] text-xl font-semibold font-['PingFang_SC']">
                {{ interactionStats.favorites }}
              </div>
              <div class="text-[#00000099] text-[10px] font-normal font-['PingFang_SC']">
                次
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 完播率 -->
      <div class="bg-white rounded-lg p-4 mb-4">
        <div class="text-base font-semibold mb-4 text-gray-900">
          完播率
        </div>
        <div class="flex flex-col gap-4">
          <div v-for="(item, index) in completionData" :key="index" class="flex items-center gap-3">
            <span class="w-15 flex-shrink-0">{{ item.time }}</span>
            <t-progress :percentage="item.percentage" class="flex-1" />
          </div>
        </div>
      </div>

      <!-- 区域统计，很简陋，还没扣完，起床再扣 -->
      <div class="bg-white rounded-lg p-4 mb-4">
        <div class="text-base font-semibold mb-4 text-gray-900">
          区域统计
        </div>
        <t-table
          :data="regionData"
          :columns="columns"
          :max-height="400"
          row-key="region"
          size="small"
          class="[--td-table-border-color:theme(colors.gray.200)]"
        />
      </div>
    </div>
  </div>
</template>
