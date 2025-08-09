<script setup lang='ts'>
defineOptions({
  name: '404',
})

const router = useRouter()

function handleGoHome() {
  router.push('/home')
}

function handleGoBack() {
  router.back()
}
</script>

<template>
  <div class="error-404">
    <div class="error-content">
      <div class="error-icon">
        <t-icon name="error-circle" size="120" />
      </div>

      <h1 class="error-title">
        404
      </h1>

      <p class="error-description">
        抱歉，您访问的页面不存在
      </p>

      <div class="error-actions">
        <t-button
          theme="primary"
          size="large"
          block
          @click="handleGoHome"
        >
          返回首页
        </t-button>

        <t-button
          theme="default"
          size="large"
          block
          class="mt-3"
          @click="handleGoBack"
        >
          返回上页
        </t-button>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.error-404 {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.error-content {
  text-align: center;
  max-width: 400px;
  width: 100%;
}

.error-icon {
  margin-bottom: 20px;
  color: #fff;
  opacity: 0.9;
}

.error-title {
  font-size: 72px;
  font-weight: bold;
  color: #fff;
  margin: 0 0 16px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.error-description {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 40px 0;
  line-height: 1.5;
}

.error-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;

  .t-button {
    border-radius: 8px;
    font-weight: 500;
  }
}
</style>
