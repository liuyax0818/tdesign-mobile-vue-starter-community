// 侧边栏状态管理
// 使用 Pinia 定义一个 store 来管理侧边栏的状态
// 包括是否展开、宽度等属性，以及打开、关闭和切换状态的方法
// 通过计算属性可以方便地获取当前侧边栏的状态
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useDrawerStore = defineStore('drawer', () => {
  // 状态定义
  const isOpen = ref(false) // 侧边栏是否展开
  const drawerWidth = ref('240px') // 侧边栏宽度

  // 操作方法
  const open = () => {
    isOpen.value = true // 打开侧边栏
  }

  const close = () => {
    isOpen.value = false // 关闭侧边栏
  }

  const toggle = () => {
    isOpen.value = !isOpen.value // 切换侧边栏状态
  }

  // 计算属性
  const status = computed(() => isOpen.value) // 当前状态

  return {
    isOpen,
    drawerWidth,
    open,
    close,
    toggle,
    status,
  }
})
