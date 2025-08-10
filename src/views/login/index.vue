<script setup lang='ts'>
import { useLoginHook } from './hooks'
import './index.scss'

const { formData, loading, handleLogin, formRef, rules } = useLoginHook()

// 简化的验证码登录逻辑
const agreeTerms = ref(false)
const countryCode = ref('+86')
const phoneNumber = ref('')
const router = useRouter()

function handleLoginClick() {
  if (agreeTerms.value && phoneNumber.value) {
    router.push(`/login/verification?phone=${encodeURIComponent(phoneNumber.value)}`)
  }
}
</script>

<template>
  <div class="login">
    <!-- 顶部导航栏 -->
    <div class="navbar" />

    <div class="form">
      <div class="header">
        <h1 class="title">
          欢迎登录 TDesign
        </h1>
      </div>

      <!-- 手机号输入区域 -->
      <div class="phone-section">
        <div class="phone-input">
          <div class="country">
            <span class="code">{{ countryCode }}</span>
            <span class="arrow">▼</span>
          </div>
          <div class="input-wrapper">
            <input v-model="phoneNumber" type="tel" placeholder="请输入手机号" class="input">
          </div>
        </div>
        <div class="helper">
          未注册的手机号验证通过后将自动注册
        </div>
      </div>

      <!-- 协议条款 -->
      <div class="terms">
        <label class="checkbox">
          <input v-model="agreeTerms" type="checkbox" class="checkbox-input">
          <span class="checkbox-custom" />
          <span class="text">
            同意
            <a href="#" class="link">《协议条款》</a>
          </span>
        </label>
      </div>

      <div class="action">
        <button
          :disabled="!agreeTerms || !phoneNumber"
          class="btn"
          @click="handleLoginClick"
        >
          验证并登录
        </button>
      </div>

      <!-- 其他登录方式 -->
      <div class="other">
        <div class="other-header">
          <span class="other-text">其他方式</span>
        </div>
        <div class="other-options">
          <button class="pwd-btn">
            密码登录
          </button>
          <div class="social">
            <button class="icon wechat">
              <t-icon name="logo-wechat-stroke" />
            </button>
            <button class="icon qq">
              <t-icon name="logo-qq" />
            </button>
            <button class="icon work-wechat">
              <t-icon name="logo-wecom" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
