<script setup lang='ts'>
import { useVerification } from './hooks'
import './index.scss'

const {
  phoneNumber,
  verificationCode,
  countdown,
  canResend,
  sendVerificationCode,
  verifyAndLogin,
} = useVerification()
</script>

<template>
  <div class="verification-page">
    <div class="verification-form">
      <div class="verification-header">
        <h1 class="verification-title">
          请输入验证码
        </h1>
      </div>

      <!-- 验证码输入区域 -->
      <div class="verification-section">
        <div class="verification-info">
          验证码已通过短信发送至 {{ phoneNumber }}
        </div>
        <div class="verification-input">
          <t-input
            v-model="verificationCode"
            type="text"
            placeholder="请输入验证码"
            class="input"
            maxlength="6"
          />
          <div class="input-separator" />
          <t-button
            :disabled="!canResend"
            class="send-code-btn"
            variant="text"
            @click="sendVerificationCode"
          >
            {{ canResend ? '发送验证码' : `${countdown}秒后重发` }}
          </t-button>
        </div>
      </div>

      <div class="verification-action">
        <t-button
          :disabled="!verificationCode"
          class="verification-btn"
          @click="verifyAndLogin"
        >
          登录
        </t-button>
      </div>
    </div>
  </div>
</template>
