<script setup lang='ts'>
import SettingGroup from './components/SettingGroup.vue'

defineOptions({
  name: 'Setting',
})

function noop() {}

const groups = [
  [
    { title: '通用设置', icon: 'app', onClick: noop },
    { title: '通知设置', icon: 'notification', onClick: noop },
    { title: '切换语言', icon: 'internet', onClick: noop },
  ],
  [
    { title: '深色模式', icon: 'image', onClick: noop },
    { title: '字体大小', icon: 'chart', onClick: noop },
    { title: '播放设置', icon: 'sound', onClick: noop },
  ],
  [
    { title: '账号安全', icon: 'secured', onClick: noop },
    { title: '隐私', icon: 'info-circle', onClick: noop },
  ],
]
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

    <SettingGroup v-for="(items, idx) in groups" :key="idx" :items="items" />
  </div>
</template>
