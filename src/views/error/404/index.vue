<script setup lang='ts'>
defineOptions({
  name: '404',
})

const router = useRouter()

function handleGoHome() {
  router.push('/home')
}
</script>

<route lang="json5">
{
  meta: {
    title: '404页面',
  }
}
</route>

<template>
  <Banner func="back" title="404" />
  <div class="h-full flex items-center flex-col justify-center px-4">
    <t-result>
      <template #image>
        <t-image src="/src/assets/404.svg" class="external-class-image" />
      </template>
      <template #title>
        <div>404 Not Found</div>
      </template>
      <template #description>
        <div>抱歉，您访问的页面不存在或已被删除</div>
      </template>
    </t-result>
    <div class="mt-10">
      <t-button theme="primary" size="medium" @click="handleGoHome">
        返回首页
      </t-button>
    </div>
  </div>
</template>

<style lang='scss' scoped></style>
