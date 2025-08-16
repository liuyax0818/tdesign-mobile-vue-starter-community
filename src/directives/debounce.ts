import type { Directive, DirectiveBinding } from 'vue'

export const debounce: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value, arg, modifiers } = binding
    const event = Object.keys(modifiers)[0] || 'click'
    const delay = Number(arg) || 500

    if (typeof value !== 'function') {
      console.warn('v-debounce: 绑定值必须是一个函数')
      return
    }

    let timer: NodeJS.Timeout | null = null

    el.addEventListener(event, () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        value()
      }, delay)
    })
  },
}
