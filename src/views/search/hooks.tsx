import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getSearchDiscApi } from '@/api/search'

export function useSearchHook() {
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
  const searchSuggestions = ref([])

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

  function getSearchSuggList() {
    getSearchDiscApi().then((res) => {
      searchSuggestions.value = res.data
    }).catch(() => {})
  }

  return {
    searchValue,
    historyTags,
    searchSuggestions,
    onCancel,
    clearHistory,
    getSearchSuggList,
    onHistoryTagClick,
    onSuggestionClick,
  }
}
