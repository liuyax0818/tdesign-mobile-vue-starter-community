<script setup lang='ts'>
const router = useRouter()
const cataList = reactive<string[]>([])

function buildCataList() {
  // 众所周知，路由结构是个树形结构
  // 正常来讲，应该通过遍历树的方式来将路由扁平化
  // 这里作为示例，索性直接写了(其实是懒得写哈哈哈)
  // 编写的时候注意一下，最好能实现通用
  const routeLv1 = router.options.routes // 一级路由
  const routeLv2 = routeLv1[0].children // 二级路由
  // 标题什么的，通过 meta 读取，meta 信息由每个页面的 route 标签定义
  routeLv1.forEach(v => cataList.push(v.path))
  routeLv2.forEach(v => cataList.push(v.path))
}

onBeforeMount(() => {
  buildCataList()
})
</script>

<template>
  <div class="w-[280px]">
    <!-- TODO: 在此编写目录页面，下面只是示例，自行选择保留 -->
    <h3>页面目录</h3>
    <div v-for="item in cataList" :key="item">
      {{ item }}
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>
