import { fakerZH_CN as faker } from '@faker-js/faker'
import dayjs from 'dayjs'

interface MessageInfo {
  id: string // 改为必填字段
  userAvatar?: string
  content?: string
  me?: boolean
  time: dayjs.ConfigType
  isTime?: boolean
}

export function useChatHook() {
  const route = useRoute()

  const routeParam = route.params as { id: string, name: string }
  const userInfo = reactive({
    id: routeParam.id,
    name: routeParam.name,
  })

  interface RecycleScroller {
    $el?: HTMLElement
    scrollToPosition?: (position: number) => void
  }

  const chatContainerRef = ref<HTMLElement | RecycleScroller | null>(null)
  const footerRef = ref()

  const messageList = ref<MessageInfo[]>([])

  /** 发送消息 */
  async function sendMessage(msg: string) {
    const lastItem = messageList.value.at(-1)
    const lastTime = lastItem?.time

    if (lastTime && Date.now() - dayjs(lastTime).valueOf() > 120000) {
      // 最新消息和当前消息相差两分钟，就要给时间段
      messageList.value.push({
        id: `time-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // 为时间块添加唯一id
        time: Date.now(),
        isTime: true,
      })
    }

    // 获取最后一个消息的id（跳过时间块）
    const lastMessage = messageList.value
      .filter(item => !item.isTime)
      .at(-1)

    const nextId = lastMessage ? `${Number(lastMessage.id) + 1}` : '1'

    messageList.value.push({
      id: nextId,
      userAvatar: `https://tdesign.gtimg.com/mobile/demos/avatar3.png`,
      content: msg.trim(),
      time: Date.now(),
      me: true,
      isTime: false,
    })
    scrollToBottom()
    footerRef.value!.clearMsg()

    // 模拟回复
    setTimeout(() => {
      const lastMessage = messageList.value
        .filter(item => !item.isTime)
        .at(-1)

      const replyId = lastMessage ? `${Number(lastMessage.id) + 1}` : '2'

      messageList.value.push({
        id: replyId,
        userAvatar: `https://tdesign.gtimg.com/mobile/demos/avatar${getItId(userInfo.id)}.png`,
        content: faker.lorem.sentence({ min: 3, max: 15 }),
        time: Date.now(),
        me: false,
        isTime: false,
      })
      scrollToBottom()
    }, faker.number.int({ min: 1500, max: 3000 }))
  }

  /** 构建消息列表，先随机 n 条数据 */
  function buildMessageList() {
    const n = faker.number.int({ min: 5, max: 15 })
    const arr: MessageInfo[] = []
    let timeCount = 0 // 累计时间段，保证随机的时间是连续的
    for (let i = 0; i < n; i++) {
      const me = faker.datatype.boolean(0.3)
      timeCount += faker.number.int({ min: 60000, max: 300000 }) // 随机时间段，1min~5min
      arr.push({
        id: `${i + 1}`,
        userAvatar: `https://tdesign.gtimg.com/mobile/demos/avatar${me ? '3' : getItId(userInfo.id)}.png`,
        content: faker.lorem.sentence({ min: 3, max: 15 }),
        time: Date.now() - timeCount,
        me,
        isTime: false,
      })
    }
    // 第一个一定是时间块，也要有id
    arr.push({
      id: `time-${Date.now()}-initial`,
      isTime: true,
      time: Date.now() - timeCount,
    })

    messageList.value = arr.reverse()
    scrollToBottom(false)
  }

  /** 滚动至底部 */
  function scrollToBottom(smooth = true) {
    nextTick(() => {
      const container = chatContainerRef.value
      if (!container) {
        return
      }

      // 如果是虚拟滚动组件
      if ('scrollToPosition' in container) {
        container.scrollToPosition(999999) // 很大的值确保滚动到底部
        return
      }

      // 如果是组件实例
      if ('$el' in container && container.$el) {
        const el = container.$el
        el.scrollTo({
          top: el.scrollHeight,
          behavior: smooth ? 'smooth' : undefined,
        })
        return
      }

      // 如果是 DOM 元素
      if (container instanceof HTMLElement) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: smooth ? 'smooth' : undefined,
        })
      }
    })
  }

  return {
    userInfo,
    footerRef,
    messageList,
    chatContainerRef,
    sendMessage,
    scrollToBottom,
    buildMessageList,
  }
}

function getItId(id: string) {
  const num = Number(id) - 1
  return num % 5 + 1
}
