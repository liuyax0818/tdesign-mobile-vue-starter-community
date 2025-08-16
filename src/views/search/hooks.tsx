import { ref } from 'vue'
import { useRouter } from 'vue-router'

export function useSearchLogic() {
  const router = useRouter()
  const searchValue = ref('')

  // 历史记录的数据
  const historyTags = ref([
    'AI绘画',
    'Stable Diffusion',
    '版权素材',
    '星空',
    'Illustration',
    'AI绘画',
  ])

  // 搜索发现的数据
  const searchSuggestions = ref([
    '科比大战布莱恩特',
    '喜欢马嘉祺的7种特征，看看你中了几个',
    '滑雪大冒险的兵来了！哈基米音乐登场',
    '小时候看这集吃成大伟带了',
    '爆了！嘉然锐评虚环PV中自己的画：画得很可爱！',
    '把我放在唐代肯定比过苏轼',
    '天津美食吃法之剩包子篇',
  ])

  function handleLeftClick() {
    router.back()
  }

  function onSearchChange(value: string) {
    searchValue.value = value
  }

  function onCancel() {
    searchValue.value = ''
    router.back()
  }

  function clearHistory() {
    historyTags.value = []
  }

  function onHistoryTagClick(tag: string) {
    searchValue.value = tag
  }

  function onSuggestionClick(suggestion: string) {
    searchValue.value = suggestion
  }

  return {
    searchValue,
    historyTags,
    searchSuggestions,
    handleLeftClick,
    onSearchChange,
    onCancel,
    clearHistory,
    onHistoryTagClick,
    onSuggestionClick,
  }
}
