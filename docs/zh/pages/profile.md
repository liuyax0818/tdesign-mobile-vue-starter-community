# 个人中心 {#profile}

## 页面概述

个人中心页面是用户管理个人信息和访问相关功能的核心界面，集成了用户信息展示、数据统计、服务推荐和系统设置等功能。页面采用模块化设计，提供清晰的信息架构和直观的操作路径。

## 设计理念

本页面设计遵循**用户为中心**和**功能聚合**原则：

*  **个性化展示** ：根据登录状态显示不同的界面内容
*  **功能模块化** ：将相关功能聚合到统一的卡片容器中
*  **视觉一致性** ：保持与整体设计语言的一致性

采用卡片式布局和清晰的视觉层次，确保用户能够快速找到所需功能并获得良好的操作体验。

## 核心功能

### 用户信息管理

*  **状态感知** ：智能识别用户登录状态，显示相应内容
*  **信息展示** ：显示头像、用户名、个性化标签等信息
*  **快捷编辑** ：提供个人信息编辑的快速入口

### 数据统计

*  **发布状态** ：展示内容发布的各种状态统计
*  **可视化呈现** ：使用图标和数字结合的方式显示数据
*  **快速访问** ：点击统计项直接进入对应功能页面

### 服务推荐

*  **功能聚合** ：集成常用服务和工具入口
*  **智能推荐** ：根据用户行为推荐相关服务
*  **扩展性强** ：支持动态添加和配置服务项目

## 开发体验

### 组件架构

**text**

```
ProfilePage
├── UserInfoSection (已登录/未登录状态)
├── PublishStatsGrid (发布统计)
├── ServiceGrid (服务推荐)
└── FunctionList (功能入口)
```

### 状态管理

**typescript**

```
// 个人中心业务逻辑
export function useProfileHook() {
  const loginStatus = ref(false)
  const userInfo = reactive({ /* 用户数据 */ })
  const router = useRouter()

  // 导航功能
  const goToEdit = () => router.push('/profile/info')
  const goToLogin = () => router.push('/login')
  const goToSettings = () => router.push('/setting')

  return { loginStatus, userInfo, goToEdit, goToLogin, goToSettings }
}
```

### 数据驱动

*  **动态配置** ：服务列表和功能入口支持动态配置
*  **状态响应** ：实时响应登录状态变化
*  **本地化处理** ：支持多语言和个性化配置

## 组件设计

### UserLogged 组件

**vue**

```
<script setup lang='ts'>
import { Edit1Icon } from 'tdesign-icons-vue-next'

defineProps<{
  avatar?: string
  title: string
  tags: any[]
}>()
</script>

<template>
  <t-cell>
    <template #image>
      <t-avatar :image="avatar" size="64px" />
    </template>
    <template #rightIcon>
      <Edit1Icon size="20px" />
    </template>
    <template #title>
      <span class="font-semibold mt-[6px]">{{ title }}</span>
    </template>
    <template #description>
      <div class="flex gap-2">
        <t-tag v-for="item in tags" :key="item.label" variant="light">
          <template #icon>
            <t-icon :name="item.icon" size="12px" />
          </template>
          <span class="text-xs">{{ item.label }}</span>
        </t-tag>
      </div>
    </template>
  </t-cell>
</template>
```

### UserUnLogged 组件

**vue**

```
<script setup lang='ts'>
import { UserIcon } from 'tdesign-icons-vue-next'
</script>

<template>
  <div class="w-full p-4 flex items-center">
    <t-avatar size="64px">
      <template #icon>
        <UserIcon size="32px" />
      </template>
    </t-avatar>
    <div class="flex-1 pl-4 font-semibold">请先登录/注册</div>
  </div>
</template>
```

### 网格布局组件

**vue**

```
<template>
  <t-grid :column="4">
    <t-grid-item
      v-for="(item, index) in items"
      :key="index"
      :text="item.label"
      :image="item.icon"
      @click="item.click"
    />
  </t-grid>
</template>
```

## 样式系统

### 实际样式

**scss**

```
.publish-area {
  :deep(.t-grid-item) {
    padding: 0;
    font-size: 22px;

    &:nth-child(1) {
      border-right: 1px solid #e7e7e7;
    }
  }
}
```

### 响应式设计

*  **移动端优化** ：针对小屏幕优化布局和间距
*  **触摸目标** ：确保按钮和链接有足够的点击区域
*  **字体层次** ：建立清晰的视觉层次结构

## 功能扩展

### 发布状态配置

**typescript**

```
// 可配置的服务列表
const publishStatus = [
  { name: '全部发布', icon: () => h(FormIcon) },
  { name: '审核中', icon: () => h(SearchIcon) },
  { name: '已发布', icon: () => h(UploadIcon) },
  { name: '草稿箱', icon: () => h(FileCopyIcon) },
]
```

### 服务推荐配置

```
const services = [
  { label: '微信', icon: wechat },
  { label: 'QQ', icon: qq },
  { label: '腾讯文档', icon: tdoc },
  { label: '腾讯地图', icon: tmap },
  { label: '数据中心', icon: dataCenter, click: goToStat },
]
```

### 国际化支持

*  **多语言配置** ：支持中英文切换
*  **本地化内容** ：根据地区显示不同的服务推荐
*  **RTL 支持** ：支持从右到左的布局

## 维护者

[hikari](https://github.com/liuyax0818)、
[Yi ZiXiong](https://github.com/neikun25)
