<script setup lang='ts'>
import { useLoginHook } from './hooks'
import './index.scss'

const {
  isPasswordMode,
  agreeTerms,
  countryCode,
  phoneNumber,
  password,
  countryOptions,
  loading,
  handlePasswordLogin,
  handleVerificationLogin,
  toggleLoginMode,
  handleForgotPassword,
  handleCountryChange,
} = useLoginHook() as any

function handleLoginClick() {
  if (agreeTerms.value && phoneNumber.value) {
    if (isPasswordMode.value) {
      handlePasswordLogin()
    }
    else {
      handleVerificationLogin()
    }
  }
}
</script>

<template>
  <div class="login">
    <div class="navbar" />

    <div class="form">
      <div class="header">
        <h1 class="title">
          欢迎登录 TDesign
        </h1>
      </div>

      <div class="phone-section">
        <div class="phone-input">
          <div v-if="!isPasswordMode" class="country">
            <t-dropdown-menu :show-overlay="false">
              <t-dropdown-item :options="countryOptions" :value="countryCode" @change="handleCountryChange" />
            </t-dropdown-menu>
          </div>
          <div class="input-wrapper">
            <t-input
              v-model="phoneNumber"
              type="tel"
              :placeholder="isPasswordMode ? '请输入手机号' : '请输入手机号'"
              :label="isPasswordMode ? '账号' : ''"
              class="input"
            />
          </div>
        </div>

        <div v-if="isPasswordMode" class="password-input">
          <t-input
            v-model="password"
            type="password"
            placeholder="请输入密码"
            label="密码"
            class="input"
          />
        </div>

        <div v-if="!isPasswordMode" class="helper">
          未注册的手机号验证通过后将自动注册
        </div>
      </div>

      <div class="terms">
        <t-checkbox v-model="agreeTerms" class="checkbox" :borderless="true">
          <template #default>
            <span class="text">
              同意
              <a href="#" class="link">《协议条款》</a>
            </span>
          </template>
        </t-checkbox>
      </div>

      <div class="action">
        <t-button
          :disabled="!agreeTerms || !phoneNumber || (isPasswordMode && !password)" class="btn"
          @click="handleLoginClick"
        >
          {{ isPasswordMode ? '登录' : '验证并登录' }}
        </t-button>
      </div>

      <div v-if="isPasswordMode" class="forgot-password">
        <span class="forgot-text">忘记密码?</span>
        <t-link theme="primary" class="retrieve-link" @click="handleForgotPassword">
          找回密码
        </t-link>
      </div>

      <div class="other">
        <div class="other-header">
          <span class="other-text">其他方式</span>
        </div>
        <div class="other-options">
          <t-button class="pwd-btn" @click="toggleLoginMode">
            {{ isPasswordMode ? '验证码登录' : '密码登录' }}
          </t-button>
          <div class="social">
            <t-button class="icon wechat" variant="text">
              <t-icon name="logo-wechat-stroke" />
            </t-button>
            <t-button class="icon qq" variant="text">
              <t-icon name="logo-qq" />
            </t-button>
            <t-button class="icon work-wechat" variant="text">
              <t-icon name="logo-wecom" />
            </t-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
