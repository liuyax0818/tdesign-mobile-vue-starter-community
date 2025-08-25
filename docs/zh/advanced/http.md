# HTTP 请求 {#http}

## 设计思路 {#design}

### 1. 移动端优化封装
- 基于 `TmvRequest` 单例模式，内置 3 秒超时配置
- 自动添加 `Authorization` 头部，支持 `showError` 和 `showLoading` 配置

### 2. 智能重试机制
- 指数退避算法（1s、2s、4s），最多重试 3 次
- 针对状态码 408、500、502、503、504 和网络超时自动重试

### 3. 错误处理
- 预设中文错误提示，自动处理 401 认证失败并清除 token
- 支持静默错误模式（`showError: false`），避免重复弹窗

### 4. 类型安全
- 限制请求方法为 `GET | POST | PUT | DELETE | PATCH`
- 支持泛型类型推导：`request.get<BaseHttpResp<T>>('/api')`

## 模块结构 {#structure}

```
src/utils/request/
├── index.ts          # TmvRequest 类实现，包含拦截器和重试逻辑
└── types.d.ts        # 类型定义，扩展 axios 配置接口
```

## 使用方式 {#usage}

```typescript
import { request } from '@/utils/request'

// GET 请求
export function getUserInfoApi() {
  return request.get<BaseHttpResp>('/getUserInfo')
}

// POST 请求
export function handleLoginApi(username: string, password: string) {
  return request.post<BaseHttpResp>('/login', { username, password })
}
```

## 环境变量配置 {#env-config}

```bash
# .env.development
VITE_API_BASE_URL = '/api'
```

## 维护者 {#maintainer}

[hikari](https://github.com/liuyax0818)、[Kotone Fujita](https://github.com/FunEnn)
