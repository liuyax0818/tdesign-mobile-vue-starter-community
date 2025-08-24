# 登录页 {#login}

## 设计思路 {#design}

基于 TDesign Mobile Vue 组件构建的多步骤登录页面，支持账号密码登录和手机验证码登录两种方式，提供完整的用户认证流程。

## 模块结构 {#structure}

```
src/views/login/
├── index.vue              # 登录页主组件
├── hooks.tsx              # 登录逻辑钩子函数
└── components/            # 子组件目录
    ├── PasswordForm.vue   # 账号密码表单
    ├── PhoneForm.vue      # 手机号输入表单
    ├── VerifyCodeForm.vue # 验证码输入表单
    ├── TermsForm.vue      # 协议条款同意
    ├── RecoverPwd.vue     # 找回密码链接
    └── Other.vue          # 其他登录方式
```

## 表单验证 {#validation}

| 字段 | 验证规则 | 说明 |
|------|----------|------|
| **账号密码** | 非空验证 | 最大长度20字符 |
| **手机号** | 11位数字验证 | 支持国际区号 |
| **验证码** | 6位数字验证 | 60秒倒计时重发 |
| **协议同意** | 必选项验证 | 影响登录按钮状态 |

## 技术实现 {#implementation}

### 登录流程

```
A[账号密码登录] --> B[登录成功]
C[手机号验证] --> D[验证码验证] --> E[登录成功]
```

### 状态管理

```typescript
const _form = reactive({
  account: '', // 账号
  password: '', // 密码
  phone: '', // 手机号
  verCode: '', // 验证码
  region: '+86', // 地区代码
  isAgree: false, // 是否同意协议
})
```

## 组件详情 {#components}

### 主组件 (index.vue)

**功能**: 登录页面的主容器，协调各个子组件的显示和交互

---

### 逻辑钩子 (hooks.tsx)

**功能**: 封装所有登录相关的业务逻辑

**核心功能**:
- 步骤状态管理 (`currStep`)
- 表单数据响应式绑定
- 按钮状态计算 (`allowClick`)
- 登录流程控制 (`handleClick`)

---

### 子组件

#### PasswordForm.vue - 账号密码表单

**功能**: 提供账号和密码输入界面

> 支持手机号/邮箱输入（最大20字符）、密码框带眼睛图标、自动去除空格、透明背景样式

#### PhoneForm.vue - 手机号输入表单

**功能**: 手机号输入和地区选择

> 支持6个国家和地区选择、地区代码选择器、11位数字验证、自动注册提示

#### VerifyCodeForm.vue - 验证码表单

**功能**: 验证码输入和发送

> 6位数字验证码输入、自动发送验证码、60秒倒计时重发、手机号显示确认

#### TermsForm.vue - 协议条款

**功能**: 用户协议同意确认

> 单选框组件、无边框样式、小字体显示、必选项验证

#### RecoverPwd.vue - 找回密码

**功能**: 提供找回密码的链接入口

> 简洁文本链接、蓝色主题色、点击事件触发

#### Other.vue - 其他登录方式

**功能**: 登录方式切换和第三方登录

> 登录方式切换、第三方登录按钮、圆形图标设计

## 页面布局 {#layout}

### 整体结构

```vue
<template>
  <div class="h-full overflow-y-auto px-4">
    <!-- 透明背景的 Banner -->
    <Banner transparent :border="false" />

    <!-- 动态标题 -->
    <div class="text-[28px] font-semibold ml-1 mb-6">
      {{ title }}
    </div>

    <!-- 条件渲染的表单组件 -->
    <PasswordForm v-if="currStep === 1" />
    <PhoneForm v-if="currStep === 2" />
    <VerifyCodeForm v-if="currStep === 3" />

    <!-- 协议条款 -->
    <TermsForm v-if="currStep !== 3" />

    <!-- 登录按钮 -->
    <t-button block :disabled="!allowClick" theme="primary" size="large">
      {{ btnText }}
    </t-button>

    <!-- 找回密码 -->
    <RecoverPwd v-if="currStep === 1" />

    <!-- 其他登录方式 -->
    <Other v-if="currStep !== 3" class="mt-8" />
  </div>
</template>
```

## 维护者 {#maintainer}

[hikari](https://github.com/liuyax0818)、[Kotone Fujita](https://github.com/FunEnn)
