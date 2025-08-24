# 对话页 {#chat}

## 页面概述

对话页面提供完整的实时聊天体验，采用现代化的消息界面设计，支持文本消息的发送、接收和显示。页面基于先进的前端技术栈构建，确保流畅的交互体验和良好的性能表现。

## 设计理念

本页面设计遵循**对话为中心**和**用户体验优先**原则：

*  **自然对话流** ：模仿真实对话的布局和交互模式
*  **即时反馈** ：消息发送和接收提供清晰的视觉反馈
*  **上下文保持** ：智能的消息分组和时间显示，维护对话连贯性

采用左右布局区分发送方和接收方，通过精心的动效设计和状态管理，打造沉浸式的聊天体验。

## 核心功能

### 消息展示

*  **双向布局** ：左侧显示对方消息，右侧显示己方消息
*  **时间上下文** ：智能时间分组，避免过多时间戳干扰
*  **头像显示** ：显示用户头像

### 消息交互

*  **实时发送** ：支持文本消息的即时发送
*  **消息回显** ：发送后立即显示，提供即时反馈
*  **模拟回复** ：内置回复模拟，增强演示效果

### 用户体验

*  **自动滚动** ：新消息自动滚动到可视区域
*  **时间显示** ：点击消息显示详细时间信息

## 开发体验

### 技术架构

**typescript**

```
// 聊天功能 Hook
export function useChatHook() {
  const messageList = ref<Message[]>([])
  const { sendMessage, buildMessageList, scrollToBottom } = useChatActions()

  return {
    messageList,
    sendMessage,
    buildMessageList,
    scrollToBottom
  }
}
```

### 路由配置

对话页面使用动态路由配置：

**typescript**

```
路由路径：'/message/[id]/[name]/'
```

### 组件化设计

**text**

```
ChatContainer
├── MessageList
│   ├── MessageBubble (Left)
│   ├── MessageBubble (Right)
│   └── TimeSeparator
└── MessageInput
    ├── TextArea
    └── SendButton
```

### 状态管理

*  **本地状态** ：使用 Vue Composition API 管理聊天状态
*  **数据持久化** ：支持消息历史的本地存储
*  **实时同步** ：模拟实时消息推送和处理

## 组件设计

### Message 组件

**vue**

```
<script setup lang="tsx">
const props = defineProps<{
  avatar: string | VNode | Component
  content: string | VNode | Component
  time?: dayjs.ConfigType
  position?: 'left' | 'right'
}>()

// 交互功能
const showTime = ref(false)
const handleClick = () => {
  showTime.value = true
  setTimeout(() => showTime.value = false, 2000)
}
</script>
```

### Footer 组件

**vue**

```
<script setup lang='ts'>
const emits = defineEmits(['send'])
const msg = ref<string>('')

const allowSend = computed(() => {
  return msg.value.trim().length > 0
})

function handleSend() {
  if (!allowSend.value) {
    return
  }
  emits('send', msg.value)
}

function clearMsg() {
  msg.value = ''
}

defineExpose({ clearMsg })
</script>
```

### TimeBar 组件

**vue**

```
<script setup lang='ts'>
import dayjs from 'dayjs'

defineProps<{
  time: dayjs.ConfigType
}>()
</script>

<template>
  <div class="w-full pt-2 text-center text-xs text-[#00000066]">
    {{ dayjs(time).format('HH:mm') }}  // 使用 dayjs 格式化为小时:分钟
  </div>
</template>
```

## 样式系统

### 实际样式

**scss**

```
.left-content {
  border-radius: 0 12px 12px 12px;
  background-color: #f3f3f3;
}

.right-content {
  border-radius: 12px 0 12px 12px;
  background-color: #d9e1ff;
}

.msg-content {
  padding: 12px;
  max-width: 68vw;
  font-size: 14px;
  overflow-wrap: break-word;
}

.input-area {
  border-top: 0.5px solid #e7e7e7;
  background-color: #fff;
  padding: 12px;
  gap: 12px;
}

.send-btn {
  width: 64px;
  height: 40px;
  background: #0052d9;
  color: #fff;
  border-radius: 100px;

  &.is-disabled {
    background: #b5c7ff;
    cursor: not-allowed;
  }
}
```

### 动效设计

*  **平滑滚动** ：使用 CSS transition 实现流畅的滚动效果
*  **消息动画** ：新消息的淡入和移动动画
*  **交互反馈** ：按钮和输入框的点击反馈效果

## 数据处理

### 消息管理

**typescript**

```
import { fakerZH_CN as faker } from '@faker-js/faker'
import dayjs from 'dayjs'

// 消息构建逻辑
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

  // 添加时间分隔
  arr.push({
    isTime: true,
    time: Date.now() - timeCount,
  })

  return arr.reverse()
}

// 时间间隔检查（2分钟）
if (Date.now() - dayjs(lastTime).valueOf() > 120000) {
  // 添加时间分隔块
}
```

### 性能优化

*  **虚拟滚动** ：支持大量消息的高性能渲染
*  **图片懒加载** ：消息图片的按需加载
*  **内存管理** ：合理的组件销毁和状态清理

## 维护者

[hikari](https://github.com/liuyax0818)、
[Yi ZiXiong](https://github.com/neikun25)
