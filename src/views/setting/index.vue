<script setup lang='ts'>
import './index.scss'

defineOptions({
  name: 'Setting',
})
</script>

<template>
  <div class="setting-page">
    <Banner title="设置" func="back" />

    <div class="setting-content">
      <div class="setting-group">
        <t-cell title="通用设置" arrow hover @click="() => {}">
          <template #left-icon>
            <t-icon name="setting" size="20px" color="#0052d9" />
          </template>
        </t-cell>
        <t-cell title="通知设置" arrow hover @click="() => {}">
          <template #left-icon>
            <t-icon name="notification" size="20px" color="#0052d9" />
          </template>
        </t-cell>
      </div>

      <div class="setting-group">
        <t-cell title="深色模式" arrow hover @click="() => {}">
          <template #left-icon>
            <t-icon name="image" size="20px" color="#0052d9" />
          </template>
        </t-cell>
        <t-cell title="字体大小" arrow hover @click="() => {}">
          <template #left-icon>
            <t-icon name="chart-bar" size="20px" color="#0052d9" />
          </template>
        </t-cell>
        <t-cell title="播放设置" arrow hover @click="() => {}">
          <template #left-icon>
            <t-icon name="sound" size="20px" color="#0052d9" />
          </template>
        </t-cell>
      </div>

      <div class="setting-group">
        <t-cell title="账号安全" arrow hover @click="() => {}">
          <template #left-icon>
            <t-icon name="lock-on" size="20px" color="#0052d9" />
          </template>
        </t-cell>
        <t-cell title="隐私" arrow hover @click="() => {}">
          <template #left-icon>
            <t-icon name="info-circle" size="20px" color="#0052d9" />
          </template>
        </t-cell>
      </div>
    </div>
  </div>
</template>
