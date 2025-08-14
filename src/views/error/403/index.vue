<script setup lang='ts'>
defineOptions({
  name: '403',
})

const router = useRouter()

function handleGoHome() {
  router.push('/home')
}

function handleGoBack() {
  router.back()
}
</script>

<route lang="json5">
{
  meta: {
    title: '403页面',
  }
}
</route>

<template>
  <div class="error-403">
    <div class="error-content">
      <div class="error-icon">
        <t-icon name="lock-on" size="80" />
      </div>

      <h1 class="error-title">
        403
      </h1>
      <p class="error-description">
        抱歉，您没有权限访问此页面
      </p>

      <div class="error-actions">
        <t-button theme="primary" size="large" block @click="handleGoHome">
          返回首页
        </t-button>
        <t-button theme="default" size="large" block class="mt-3" @click="handleGoBack">
          返回上页
        </t-button>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.error-403 {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 20px;
}

.error-content {
  text-align: center;
  max-width: 350px;
  width: 100%;
}

.error-icon {
  margin-bottom: 16px;
  color: #666;
}

.error-title {
  font-size: 48px;
  font-weight: bold;
  color: #333;
  margin: 0 0 12px 0;
}

.error-description {
  font-size: 16px;
  color: #666;
  margin: 0 0 32px 0;
  line-height: 1.4;
}

.error-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
