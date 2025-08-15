import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// 聊天消息类型定义
interface ChatMessage {
  id: number
  contactId: number // 关联的联系人ID
  sender: 'me' | 'contact' // 发送者
  content: string // 消息内容
  time: string // 消息时间
  unread: boolean // 是否未读
}

// 默认头像路径
const DEFAULT_AVATARS = [
  { src: '/avatars/user1.jpg', alt: '用户1' },
  { src: '/avatars/user2.jpg', alt: '用户2' },
  { src: '/avatars/user3.jpg', alt: '用户3' },
  { src: '/avatars/user4.jpg', alt: '用户4' },
]

const MY_AVATAR = { src: '/avatars/me.jpg', alt: '我的头像' }
const PLACEHOLDER_AVATAR = { src: '/avatars/placeholder.jpg', alt: '占位头像' }

export const useMessageStore = defineStore('message', () => {
  // 所有聊天记录，按联系人ID分组
  const allChatMessages = ref<Record<number, ChatMessage[]>>({
    1: [
      {
        id: 1,
        contactId: 1,
        sender: 'contact',
        content: '明天会议几点开始？',
        time: '9:30',
        unread: false,
      },
      {
        id: 2,
        contactId: 1,
        sender: 'me',
        content: '上午10点开始',
        time: '9:31',
        unread: false,
      },
      {
        id: 3,
        contactId: 1,
        sender: 'contact',
        content: '那明天准时见哦',
        time: '9:32',
        unread: false,
      },
      {
        id: 4,
        contactId: 1,
        sender: 'me',
        content: '好的，我会记得的',
        time: '9:33',
        unread: false,
      },
      {
        id: 5,
        contactId: 1,
        sender: 'contact',
        content: '在吗？',
        time: '今天10:15',
        unread: true,
      },
      {
        id: 6,
        contactId: 1,
        sender: 'contact',
        content: 'TDesign组件库如何更好地使用？',
        time: '今天10:16',
        unread: true,
      },
    ],
    2: [
      {
        id: 1,
        contactId: 2,
        sender: 'contact',
        content: '下午的会议改到3点了',
        time: '昨天14:30',
        unread: true,
      },
    ],
    3: [
      {
        id: 1,
        contactId: 3,
        sender: 'contact',
        content: '你要的资料我已经发你邮箱了',
        time: '周一11:20',
        unread: false,
      },
    ],
  })

  const getLastMessageInfo = (contactId: number): {
    lastMessage: string
    lastMessageTime: string
    unreadCount: number
  } => {
    const messages = allChatMessages.value[contactId] || []
    if (messages.length === 0) {
      return {
        lastMessage: '',
        lastMessageTime: '',
        unreadCount: 0,
      }
    }

    const lastMessage = messages[messages.length - 1]
    return {
      lastMessage: lastMessage.content,
      lastMessageTime: lastMessage.time,
      unreadCount: messages.filter(msg => msg.unread).length,
    }
  }

  const contacts = computed(() => [
    {
      id: 1,
      name: '张三',
      avatar: DEFAULT_AVATARS[0],
      ...getLastMessageInfo(1),
    },
    {
      id: 2,
      name: '李四',
      avatar: DEFAULT_AVATARS[1],
      ...getLastMessageInfo(2),
    },
    {
      id: 3,
      name: '王五',
      avatar: DEFAULT_AVATARS[2],
      ...getLastMessageInfo(3),
    },
  ])

  const preloadAvatars = () => {
    const allAvatars = [
      MY_AVATAR,
      PLACEHOLDER_AVATAR,
      ...DEFAULT_AVATARS,
      ...contacts.value.map(c => c.avatar),
    ].filter((v, i, a) => a.findIndex(item => item.src === v.src) === i)

    allAvatars.forEach(avatar => new Image().src = avatar.src)
  }

  const unreadCount = computed(() => contacts.value.reduce((total, c) => total + c.unreadCount, 0))

  const getContactAvatar = (contactId: number) => {
    const contact = contacts.value.find(c => c.id === contactId)
    return contact?.avatar || PLACEHOLDER_AVATAR
  }

  const markAsRead = (contactId: number) => {
    if (allChatMessages.value[contactId]) {
      allChatMessages.value[contactId].forEach((msg) => {
        msg.unread = false
      })
    }
  }

  const sendMessage = (contactId: number, content: string) => {
    if (!content.trim()) {
      return null
    }

    const now = new Date()
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`

    // 创建新消息
    const newMsg: ChatMessage = {
      id: Date.now(),
      contactId,
      sender: 'me',
      content,
      time: timeStr,
      unread: false,
    }

    // 添加到聊天记录
    if (!allChatMessages.value[contactId]) {
      allChatMessages.value[contactId] = []
    }
    allChatMessages.value[contactId].push(newMsg)

    return newMsg
  }

  const getChatMessages = (contactId: number) => {
    return allChatMessages.value[contactId] || []
  }

  const addMessage = (message: ChatMessage, isCurrentChat = false) => {
    const { contactId } = message

    if (isCurrentChat) {
      message.unread = false
    }

    if (!allChatMessages.value[contactId]) {
      allChatMessages.value[contactId] = []
    }
    allChatMessages.value[contactId].push(message)
  }

  return {
    contacts,
    allChatMessages,
    unreadCount,
    myAvatar: MY_AVATAR,
    getContactAvatar,
    markAsRead,
    sendMessage,
    getChatMessages,
    preloadAvatars,
    addMessage,
  }
})
