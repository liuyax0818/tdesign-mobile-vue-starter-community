<script setup lang='ts'>
defineOptions({
  name: '',
})

const router = useRouter()
</script>

<route lang="json5">
{
  meta: {
    showFooter: true
  }
}
</route>

<template>
  <div>
    <Banner func="none" title="我的" />
    <div>我的</div>

    <div class="flex gap-2">
      <t-button @click="router.push('/profile/edit')">
        edit
      </t-button>
      <t-button @click="router.push('/profile/info')">
        info
      </t-button>
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>
