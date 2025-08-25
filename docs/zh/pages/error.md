# 错误页 {#error}

## 设计思路 {#design}

基于 TDesign Mobile Vue 的 `t-result` 组件构建统一的错误页面模板。

## 模块结构 {#structure}

```
src/views/error/
├── 403/                 # 403 权限错误页面
├── 404/                 # 404 页面不存在错误
└── 500/                 # 500 服务器错误页面
```

## 页面布局

```vue
<template>
  <Banner func="back" title="错误代码" />
  <div class="h-full flex items-center flex-col justify-center px-4">
    <t-result>
      <!-- 错误图标 -->
      <template #image>
        <ErrorIcon />
      </template>
      <!-- 错误标题 -->
      <template #title>
        <div>错误标题</div>
      </template>
      <!-- 错误描述 -->
      <template #description>
        <div>错误描述信息</div>
      </template>
    </t-result>
    <!-- 操作按钮 -->
    <div class="mt-10">
      <t-button theme="primary" size="medium" @click="handleGoHome">
        返回首页
      </t-button>
    </div>
  </div>
</template>
```

## 维护者 {#maintainer}

[Kotone Fujita](https://github.com/FunEnn)
