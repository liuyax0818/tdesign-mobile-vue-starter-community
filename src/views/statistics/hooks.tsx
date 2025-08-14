import { ref } from 'vue'
import { useRouter } from 'vue-router'

export function useStatisticsLogic() {
  const router = useRouter()

  function handleLeftClick() {
    router.back()
  }

  // 整体情况数据
  const overallStats = ref({
    views: '202w',
    likes: '233w',
    shares: '102w',
  })

  // 互动情况数据
  const interactionStats = ref({
    views: '919',
    likes: '887',
    shares: '104',
    favorites: '47',
  })

  // 完播率数据
  const completionData = ref([
    { time: '12:00', percentage: 80 },
    { time: '14:00', percentage: 60 },
    { time: '16:00', percentage: 85 },
    { time: '18:00', percentage: 43 },
    { time: '20:00', percentage: 60 },
    { time: '22:00', percentage: 95 },
  ])

  // 区域统计数据
  const regionData = ref([
    { title: '视频A', global: 4442, northChina: 456, eastChina: 456, southChina: 456 },
    { title: '视频B', global: 1234, northChina: 456, eastChina: 456, southChina: 456 },
    { title: '视频C', global: 12312, northChina: 456, eastChina: 456, southChina: 456 },
    { title: '视频D', global: 5666, northChina: 456, eastChina: 456, southChina: 456 },
    { title: '视频E', global: 1234, northChina: 456, eastChina: 456, southChina: 456 },
    { title: '视频F', global: 6356, northChina: 456, eastChina: 456, southChina: 456 },
    { title: '视频G', global: 14455, northChina: 456, eastChina: 456, southChina: 456 },
    { title: '视频H', global: 1513, northChina: 456, eastChina: 456, southChina: 456 },
    { title: '视频I', global: 1556, northChina: 456, eastChina: 456, southChina: 456 },
    { title: '视频J', global: 9184, northChina: 456, eastChina: 456, southChina: 456 },
  ])

  // 表格的数据配置
  const columns = ref<Array<{
    title: string
    colKey: string
    width: number
    align: 'left' | 'center' | 'right' // 使用字面量类型以避免:columns="columns"标红
  }>>([
    {
      title: '标题',
      colKey: 'title',
      width: 91.75,
      align: 'center',
    },
    {
      title: '全球',
      colKey: 'global',
      width: 93.75,
      align: 'center',
    },
    {
      title: '华北',
      colKey: 'northChina',
      width: 93.75,
      align: 'center',
    },
    {
      title: '华东',
      colKey: 'eastChina',
      width: 93.75,
      align: 'center',
    },
    {
      title: '华南',
      colKey: 'southChina',
      width: 93.75,
      align: 'center',
    },
  ])

  return {
    handleLeftClick,
    overallStats,
    interactionStats,
    completionData,
    regionData,
    columns,
  }
}
