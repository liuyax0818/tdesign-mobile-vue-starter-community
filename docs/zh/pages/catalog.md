# 页面目录 {#catalog}

## 设计思路 {#design}

基于 Vue Router 的路由信息自动生成页面目录，通过递归遍历路由配置，提取带有 `meta.title` 的路由项，提供完整的页面导航功能。

## 模块结构 {#structure}

```
src/components/Banner/src/
└── Catalog.vue          # 页面目录组件，自动生成路由列表
```

## 实现原理 {#implementation}

### 1. 路由遍历算法
```typescript
function _traverseRoutes(routes: readonly any[], basePath: string = ''): void {
  for (const route of routes) {
    // 检查路由是否有标题
    if (route.meta?.title) {
      const fullPath = normalizePath(basePath + route.path)
      cataList.push({
        path: fullPath,
        title: route.meta.title,
      })
    }

    // 递归遍历子路由
    if (route.children?.length) {
      const newBasePath = route.path ? `${basePath}${route.path}/` : basePath
      traverseRoutes(route.children, newBasePath)
    }
  }
}
```

### 2. 路径标准化
```typescript
function _normalizePath(path: string): string {
  return path.replace(/\/+/g, '/').replace(/\/$/, '') || '/'
}
```

### 3. 数据响应式
- 使用 `reactive` 创建响应式路由列表
- 在 `onBeforeMount` 生命周期中构建目录
- 支持动态路由更新

## 使用方式 {#usage}

### 1. 路由配置要求

在 Vue 组件中使用 `<route>` 标签定义页面标题：

```vue
<script setup lang="ts">
// 组件逻辑
</script>

<template>
  <div>页面内容</div>
</template>

<route lang="json5">
{
  meta: {
    title: '设置',  // 必需的标题属性
  }
}
</route>
```

## 维护者 {#maintainer}

[Kotone Fujita](https://github.com/FunEnn)
