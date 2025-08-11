<script setup lang='ts'>
import { useLoginHook } from './hooks'
import './index.scss'

const {
  isPasswordMode,
  agreeTerms,
  countryCode,
  formData,
  rules,
  loading,
  countryOptions,
  handleVerificationLogin,
  toggleLoginMode,
  handleForgotPassword,
  handleCountryChange,
  onSubmit,
} = useLoginHook() as any

function handleLoginClick() {
  if (agreeTerms.value && formData.value.phoneNumber) {
    if (isPasswordMode.value) {
      onSubmit()
    }
    else {
      handleVerificationLogin()
    }
  }
}
</script>

<template>
  <div class="login">
    <Banner func="back" />

    <div class="form">
      <div class="header">
        <h1 class="title">
          欢迎登录 TDesign
        </h1>
      </div>

      <t-form
        v-if="isPasswordMode"
        :data="formData"
        :rules="rules"
        reset-type="initial"
        show-error-message
        :required-mark="false"
        label-align="left"
        scroll-to-first-error="auto"
        class="password-form"
        @submit="onSubmit"
      >
        <t-form-item label="账号" name="phoneNumber">
          <t-input v-model="formData.phoneNumber" borderless type="tel" placeholder="请输入账号" />
        </t-form-item>

        <t-form-item label="密码" name="password">
          <t-input v-model="formData.password" borderless type="password" :clearable="false" placeholder="请输入密码">
            <template #suffixIcon>
              <t-icon name="browse-off" />
            </template>
          </t-input>
        </t-form-item>
      </t-form>

      <div v-else class="phone-section">
        <div class="phone-input">
          <div class="country">
            <t-dropdown-menu :show-overlay="false">
              <t-dropdown-item :options="countryOptions" :value="countryCode" @change="handleCountryChange" />
            </t-dropdown-menu>
          </div>
          <div class="input-wrapper">
            <t-input v-model="formData.phoneNumber" type="tel" placeholder="请输入手机号" class="input" />
          </div>
        </div>

        <div class="helper">
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
          :disabled="!agreeTerms || !formData.phoneNumber || (isPasswordMode && !formData.password)"
          :loading="loading"
          class="btn"
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
