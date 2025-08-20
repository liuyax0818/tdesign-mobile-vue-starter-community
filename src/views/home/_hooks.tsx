import { AddIcon } from 'tdesign-icons-vue-next'
import { computed, h, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface Card {
  id: number
  title: string
  color: string
  tag1: string
  tag2: string
  image: string
}

export function useHomepage() {
  const activeTab = ref('recommend')

  // 下拉刷新状态
  const isRefreshing = ref(false)

  // 推荐内容
  const recommendCards = ref<Card[]>([
    {
      id: 1,
      title: '丁真、星空与梦想',
      color: '#ff6b6b',
      tag1: '#AI绘画',
      tag2: '#版权素材',
      image: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
    },
    {
      id: 2,
      title: '仰望星空的丁真',
      color: '#4ecdc4',
      tag1: '#版权素材',
      tag2: '#版权素材',
      image: 'https://tdesign.gtimg.com/demo/demo-image-2.png',
    },
    {
      id: 3,
      title: '星空下的丁真',
      color: '#45b7d1',
      tag1: '#原创',
      tag2: '#版权素材',
      image: 'https://tdesign.gtimg.com/demo/demo-image-3.png',
    },
    {
      id: 4,
      title: '梦幻丁真',
      color: '#f7b731',
      tag1: '#风景',
      tag2: '#版权素材',
      image: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
    },
  ])

  // 关注内容
  const followingCards = ref<Card[]>([
    {
      id: 5,
      title: '创意丁真',
      color: '#5f27cd',
      tag1: '#AI绘画',
      tag2: '#版权素材',
      image: 'https://tdesign.gtimg.com/demo/demo-image-2.png',
    },
    {
      id: 6,
      title: '城市丁真',
      color: '#00d2d3',
      tag1: '#风景',
      tag2: '#版权素材',
      image: 'https://tdesign.gtimg.com/demo/demo-image-3.png',
    },
  ])

  const currentCards = computed(() => {
    return activeTab.value === 'recommend' ? recommendCards.value : followingCards.value
  })

  function onTabChange(value: string | number) {
    activeTab.value = value as string
  }

  function onCardClick(card: Card) {
    console.log('点击卡片:', card.title)
  }

  // 下拉刷新处理函数
  async function handleRefresh() {
    isRefreshing.value = true

    try {
      // 模拟刷新请求
      await new Promise(resolve => setTimeout(resolve, 1500))
    }
    catch (error) {
      console.error('刷新失败:', error)
    }
    finally {
      isRefreshing.value = false
    }
  }

  // 路由实例
  const route = useRoute()
  const router = useRouter()

  // 发布按钮图标函数
  const iconFunc = () => h(AddIcon, { size: '20px' })

  // 发布按钮点击事件
  function onPublishClick() {
    router.push('/publish')
  }

  // 轮播图数据
  const imageCdn = 'https://tdesign.gtimg.com/mobile/demos'
  const swiperList = [
    `${imageCdn}/swiper1.png`,
    `${imageCdn}/swiper2.png`,
    `${imageCdn}/swiper1.png`,
    `${imageCdn}/swiper2.png`,
    `${imageCdn}/swiper1.png`,
    `${imageCdn}/swiper2.png`,
  ]

  return {
    activeTab,
    isRefreshing,
    currentCards,
    onTabChange,
    onCardClick,
    handleRefresh,
    route,
    router,
    iconFunc,
    onPublishClick,
    swiperList,
  }
}
