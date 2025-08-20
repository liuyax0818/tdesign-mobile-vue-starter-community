<script setup lang='ts'>
import Error500 from '@/assets/500.svg?component'

defineOptions({
  name: '500',
})

const router = useRouter()

function handleGoHome() {
  router.push('/home')
}
</script>

<route lang="json5">
{
  meta: {
    title: '500页面',
  }
}
</route>

<template>
  <Banner func="back" title="500" />
  <div class="h-full flex items-center flex-col justify-center px-4">
    <t-result>
      <template #image>
        <Error500 />
      </template>
      <template #title>
        <div>500 Internal Server Error</div>
      </template>
      <template #description>
        <div>抱歉，服务器出错啦</div>
      </template>
    </t-result>
    <div class="mt-10">
      <t-button theme="primary" size="medium" @click="handleGoHome">
        返回首页
      </t-button>
    </div>
  </div>
</template>
