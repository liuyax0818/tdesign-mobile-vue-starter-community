<script setup lang='ts'>
import { useLoginHook } from './hooks'

defineOptions({
  name: 'Login',
})

const { formData, loading, handleLogin } = useLoginHook()
</script>

<template>
  <div class="login-container">
    <div class="login-form">
      <h2 class="title">
        登录
      </h2>

      <div class="form-item">
        <label class="label">用户名</label>
        <t-input
          v-model="formData.username"
          placeholder="请输入用户名"
          clearable
          size="large"
        />
      </div>

      <div class="form-item">
        <label class="label">密码</label>
        <t-input
          v-model="formData.password"
          type="password"
          placeholder="请输入密码"
          clearable
          size="large"
        />
      </div>

      <div class="form-actions">
        <t-button
          block
          size="large"
          theme="primary"
          :loading="loading"
          @click="handleLogin"
        >
          {{ loading ? '登录中...' : '登录' }}
        </t-button>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  padding: 20px;
}

.login-form {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.title {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 24px;
  font-weight: 600;
}

.form-item {
  margin-bottom: 20px;
}

.label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
}

.form-actions {
  margin-top: 30px;
}
</style>
