<script setup lang='ts'>
import Error403 from '@/assets/403.svg?component'

defineOptions({
  name: '403',
})

const router = useRouter()

function handleGoHome() {
  router.push('/home')
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
  <Banner func="back" title="403" />
  <div class="h-full flex items-center flex-col justify-center px-4">
    <t-result>
      <template #image>
        <Error403 />
      </template>
      <template #title>
        <div>403 Forbidden</div>
      </template>
      <template #description>
        <div>抱歉，您没有权限访问此页面</div>
      </template>
    </t-result>
    <div class="mt-10">
      <t-button theme="primary" size="medium" @click="handleGoHome">
        返回首页
      </t-button>
    </div>
  </div>
</template>
