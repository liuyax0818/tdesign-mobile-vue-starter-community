import { ref } from 'vue'
import { useRouter } from 'vue-router'

export function useStatisticsLogic() {
  const router = useRouter()

  // 返回上一页
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
    { region: '南区A', value: 4442 },
    { region: '南区B', value: 1234 },
    { region: '南区C', value: 12312 },
    { region: '南区D', value: 5666 },
    { region: '南区E', value: 1234 },
    { region: '南区F', value: 6356 },
    { region: '南区G', value: 14465 },
    { region: '南区H', value: 1513 },
    { region: '南区I', value: 1556 },
    { region: '南区J', value: 9184 },
  ])

  // 表格配置
  const columns = ref([
    { colKey: 'region', title: '区域', width: 100 },
    { colKey: 'value', title: '数值', width: 100 },
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
