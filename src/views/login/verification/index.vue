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
  <div class="page">
    <Banner func="back" />

    <div class="form">
      <div class="header">
        <h1 class="title">
          请输入验证码
        </h1>
      </div>

      <div class="section">
        <div class="info">
          验证码已通过短信发送至 {{ phoneNumber }}
        </div>
        <div class="input-group">
          <t-input
            v-model="verificationCode"
            type="text"
            placeholder="请输入验证码"
            class="input"
            maxlength="6"
          />
          <div class="separator" />
          <t-button
            :disabled="!canResend"
            class="send-btn"
            variant="text"
            @click="sendVerificationCode"
          >
            {{ canResend ? '发送验证码' : `${countdown}秒后重发` }}
          </t-button>
        </div>
      </div>

      <div class="action">
        <t-button
          :disabled="!verificationCode"
          class="btn"
          @click="verifyAndLogin"
        >
          登录
        </t-button>
      </div>
    </div>
  </div>
</template>
