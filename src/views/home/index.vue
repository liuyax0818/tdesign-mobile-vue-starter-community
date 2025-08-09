<script setup lang='ts'>
defineOptions({
  name: 'Home',
})

function handleClick(url: string, method: string, body?: any) {
  fetch(url, {
    method,
    body: JSON.stringify(body),
  })
}
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
    <div>Ciallo~(∠・ω&lt; )⌒★!</div>
    <div class="flex gap-2 flex-wrap">
      <t-button @click="handleClick('/api/getUserInfo', 'GET')">
        GET Mock
      </t-button>
      <t-button @click="handleClick('/api/getUserList?curr=10&size=20', 'GET')">
        GET With Param
      </t-button>
      <t-button @click="handleClick('/api/login', 'POST')">
        POST Mock
      </t-button>
      <t-button @click="handleClick('/api/login', 'POST', { username: '菜虚鲲', password: 'ctrl' })">
        Post With Body
      </t-button>
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>
