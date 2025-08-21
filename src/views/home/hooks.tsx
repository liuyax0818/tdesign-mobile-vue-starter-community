import type { TagProps } from 'tdesign-mobile-vue'
import { useDebounceFn } from '@vueuse/core'
import sw1 from '@/assets/home/swiper1.png'
import tim1 from '@/assets/home/tim1.png'
import tim2 from '@/assets/home/tim2.png'
import tim3 from '@/assets/home/tim3.png'

interface ContentType {
  id: string
  type: 'card' | 'swiper'
  title?: string
  img?: string
  imgs?: string[]
  tags?: { label: string, type: TagProps['theme'] }[]
}

export function useHomeHook() {
  const router = useRouter()
  const activeTab = ref('recommend')

  function goToSearch() {
    router.push('/search')
  }
  function goToPublish() {
    router.push('/publish')
  }

  const disRefresh = ref<boolean>(true)
  const isRefreshing = ref<boolean>(false)

  const recomData: ContentType[] = [
    {
      id: '0',
      type: 'card',
      title: '丁真、雪豹与梦想',
      img: tim1,
      tags: [
        { label: 'AI绘画', type: 'primary' },
        { label: '版权素材', type: 'success' },
      ],
    },
    {
      id: '1',
      type: 'swiper',
      imgs: [sw1, sw1, sw1, sw1],
    },
    {
      id: '3',
      type: 'card',
      title: '仰望星空的丁真',
      img: tim2,
      tags: [
        { label: 'AI绘画', type: 'primary' },
        { label: '版权素材', type: 'success' },
      ],
    },
    {
      id: '4',
      type: 'card',
      title: '星空下的丁真',
      img: tim3,
      tags: [
        { label: 'AI绘画', type: 'primary' },
        { label: '版权素材', type: 'success' },
      ],
    },
    {
      id: '5',
      type: 'card',
      title: '梦幻丁真',
      img: tim1,
      tags: [
        { label: 'AI绘画', type: 'primary' },
        { label: '版权素材', type: 'success' },
      ],
    },
    {
      id: '6',
      type: 'card',
      title: '创意丁真',
      img: tim1,
      tags: [
        { label: 'AI绘画', type: 'primary' },
        { label: '版权素材', type: 'success' },
      ],
    },
  ]

  const followData: ContentType[] = [
    {
      id: '1',
      type: 'card',
      title: '创意丁真',
      img: tim1,
      tags: [
        { label: 'AI绘画', type: 'primary' },
        { label: '版权素材', type: 'success' },
      ],
    },
    {
      id: '2',
      type: 'card',
      title: '城市丁真',
      img: tim2,
      tags: [
        { label: 'AI绘画', type: 'primary' },
        { label: '版权素材', type: 'success' },
      ],
    },
  ]

  const dataList = ref<ContentType[]>([])

  function handleTabChange(val: string) {
    if (val === 'recommend') {
      dataList.value = recomData
    }
    if (val === 'following') {
      dataList.value = followData
    }
  }

  function handleRefresh() {
    isRefreshing.value = true
    setTimeout(() => {
      if (activeTab.value === 'recommend') {
        dataList.value = recomData
      }
      if (activeTab.value === 'following') {
        dataList.value = followData
      }
      isRefreshing.value = false
    }, 1500)
  }

  const handleScroll = useDebounceFn((evt: Event) => {
    const target = evt.target as HTMLDivElement
    if (target.scrollTop === 0) {
      disRefresh.value = false
    }
    else {
      disRefresh.value = true
    }
  }, 150)

  return {
    dataList,
    activeTab,
    disRefresh,
    isRefreshing,
    goToSearch,
    goToPublish,
    handleScroll,
    handleRefresh,
    handleTabChange,
  }
}
