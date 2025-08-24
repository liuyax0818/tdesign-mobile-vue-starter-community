# 消息列表页面 {#messages}

## 页面概述

消息列表页面是用户查看所有聊天会话的入口界面，基于 TDesign Mobile Vue 组件库构建，提供清晰的消息管理体验。

## 设计理念

本页面设计遵循**信息优先级**和**操作便捷性**原则：

*  **视觉层次分明** ：通过头像、名称、预览内容和未读计数形成清晰的信息层级
*  **即时反馈** ：未读消息采用醒目的红点提示，点击后即时更新状态
*  **流畅导航** ：平滑的页面过渡和直观的交互设计，降低用户认知负荷

页面采用列表式布局，每个会话项包含完整的上下文信息，支持快速浏览和精准操作。

## 核心功能

### 会话管理

*  **多会话展示** ：以列表形式展示所有聊天会话，支持滚动浏览
*  **实时状态更新** ：未读消息数量实时显示和更新
*  **会话排序** ：按时间倒序排列，最新会话置顶显示

### 消息预览

*  **内容截取** ：智能截取最新消息内容，保留关键信息
*  **时间显示** ：显示最后消息时间，提供时间上下文
*  **状态标识** ：通过视觉元素区分已读/未读状态

### 交互操作

*  **点击进入** ：点击会话项直接进入对应聊天界面
*  **状态同步** ：进入聊天时自动同步已读状态到列表

## 开发体验

### 技术栈特色

*  **自动路由生成** ：基于 `unplugin-vue-router` 自动生成路由配置
*  **组件自动导入** ：通过 `unplugin-vue-components` 实现组件按需加载
*  **TypeScript 支持** ：完整的类型定义，提供良好的开发提示

### 开发便捷性

**typescript**

```
// 示例：消息列表数据获取
const { msgList, goToChat, getMsgList } = useMessageHook()

onMounted(() => {
  getMsgList() // 自动处理数据加载和错误处理
})
```

### 调试支持

*  **代码定位** ：集成 `code-inspector-plugin`，快速定位组件源码
*  **Mock 数据** ：使用 `fakerServer` 提供真实的测试数据
*  **响应式设计** ：完美适配各种移动设备尺寸

## 组件架构

### MessageItem 组件

**vue**

```
<script setup lang='ts'>
const props = withDefaults(defineProps<{
  avatar?: string
  title?: string
  sub?: string
  count?: number
}>(), {
  avatar: '',
  title: '',
  sub: '',
  count: 0,
})
</script>

<template>
  <div class="message-item w-full flex items-center">
    <t-avatar size="48px" :image="props.avatar" />
    <div class="flex-1 min-w-0 px-[12px]">
      <div class="message-title truncate">{{ props.title }}</div>
      <div class="message-sub truncate">{{ props.sub }}</div>
    </div>
    <div v-if="props?.count" class="w-[24px]">
      <t-badge :count="props?.count ?? 0" :offset="[-8, 0]" />
    </div>
  </div>
</template>
```

### 数据流管理

**text**

```
API Layer → useMessageHook → MessageList → MessageItem
```

## 样式设计

### 设计系统集成

**scss**

```
.message-item {
  border-bottom: 0.5px solid #e7e7e7;
  background: #ffffff;
  height: 82px;
  padding: 16px;

  .message-title {
    color: #000000e6;
    line-height: 24px;
  }

  .message-sub {
    width: 100%;
    font-size: 14px;
    line-height: 22px;
    color: #00000099;
  }
}
```

### 响应式处理

*  **移动端优先** ：针对小屏幕优化布局和字体大小
*  **触摸友好** ：合适的点击区域和反馈效果
*  **性能优化** ：使用 CSS 硬件加速和合理的重绘策略

## API 集成

### RESTful 接口

**typescript**

```
// 消息相关 API 封装
export const messageAPI = {
  // 获取消息列表
  getList: () => request.get<MessageItem[]>('/api/messages'),

  // 标记已读
  markAsRead: (id: string) => request.post(`/api/messages/${id}/read`),

  // 获取未读计数
  getUnreadCount: () => request.get<number>('/api/messages/unread-count')
}
```

### 错误处理

*  **网络异常** ：自动重试机制和友好的错误提示
*  **数据验证** ：TypeScript 接口验证和运行时检查
*  **状态管理** ：Vue ref 和 reactive 的合理使用

## 维护者

[hikari](https://github.com/liuyax0818)、
[Yi ZiXiong](https://github.com/neikun25)
