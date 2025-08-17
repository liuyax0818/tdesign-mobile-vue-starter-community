<script setup lang='ts'>
defineOptions({
  name: 'Setting',
})
</script>

<route lang="json5">
{
  meta: {
    title: '设置',
  }
}
</route>

<template>
  <div class="setting-page h-full overflow-y-auto p-[16px]">
    <Banner title="设置" func="back" />

    <div class="setting-group">
      <t-cell title="通用设置" arrow hover @click="() => {}">
        <template #left-icon>
          <TIcon name="app" size="20px" color="#0052d9" />
        </template>
      </t-cell>
      <t-cell title="通知设置" arrow hover @click="() => {}">
        <template #left-icon>
          <TIcon name="notification" size="20px" color="#0052d9" />
        </template>
      </t-cell>

      <t-cell title="切换语言" arrow hover @click="() => {}">
        <template #left-icon>
          <TIcon name="internet" size="20px" color="#0052d9" />
        </template>
      </t-cell>
    </div>

    <div class="setting-group">
      <t-cell title="深色模式" arrow hover @click="() => {}">
        <template #left-icon>
          <TIcon name="image" size="20px" color="#0052d9" />
        </template>
      </t-cell>
      <t-cell title="字体大小" arrow hover @click="() => {}">
        <template #left-icon>
          <TIcon name="chart" size="20px" color="#0052d9" />
        </template>
      </t-cell>
      <t-cell title="播放设置" arrow hover @click="() => {}">
        <template #left-icon>
          <TIcon name="sound" size="20px" color="#0052d9" />
        </template>
      </t-cell>
    </div>

    <div class="setting-group">
      <t-cell title="账号安全" arrow hover @click="() => {}">
        <template #left-icon>
          <TIcon name="secured" size="20px" color="#0052d9" />
        </template>
      </t-cell>
      <t-cell title="隐私" arrow hover @click="() => {}">
        <template #left-icon>
          <TIcon name="info-circle" size="20px" color="#0052d9" />
        </template>
      </t-cell>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.setting-group {
  background: #fff;
  border-radius: 12px;
  margin-bottom: 16px;
  overflow: hidden;
}

:deep(.t-cell__left) {
  // 修复图标和标题不对齐的bug
  display: flex;
  align-items: center;
}
</style>
