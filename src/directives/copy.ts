import type { Directive, DirectiveBinding } from 'vue'

export const copy: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding // v-copy="xxx", value 就是 xxx
    // TODO: 双击复制逻辑
    const event = binding?.arg ?? 'click' // 指令参数: 比如 v-copy:click="", event就是 'click'
    el.addEventListener(event, () => {
      const textToCopy = typeof value === 'string' ? value : el.textContent || ''

      if (!textToCopy) {
        console.warn('v-copy: 没有可复制的内容')
        return
      }

      try {
        navigator.clipboard.writeText(textToCopy)
        console.warn('复制成功:', textToCopy)
      }
      catch (error) {
        console.error('复制失败:', error)
      }
    })
  },
}
