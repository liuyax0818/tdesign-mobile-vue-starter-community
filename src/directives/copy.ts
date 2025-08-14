import type { Directive, DirectiveBinding } from 'vue'

interface CopyElement extends HTMLElement {
  __copyHandler__?: (event: Event) => void
  __copyValue__?: any
}

/**
 * 复制文本指令
 * 点击元素时复制指定文本到剪贴板
 * @example
 * <button v-copy="'复制的内容'">复制</button>
 * <span v-copy="copyText">点击复制</span>
 */
const copy: Directive = {
  mounted(el: CopyElement, binding: DirectiveBinding) {
    const event = binding.arg || 'click' // 指令参数: 比如 v-copy:click="", event就是 'click'

    // 创建处理函数
    const handler = async () => {
      // 要复制的文本
      const currentValue = el.__copyValue__ || binding.value
      const textToCopy = typeof currentValue === 'string' ? currentValue : el.textContent || ''

      if (!textToCopy) {
        console.warn('v-copy: 没有可复制的内容')
        return
      }

      try {
        // 使用现代浏览器的 clipboard API
        await navigator.clipboard.writeText(textToCopy)
        console.warn('复制成功:', textToCopy)
      }
      catch (error) {
        console.error('复制失败:', error)
      }
    }

    // 保存当前值和handler引用
    el.__copyValue__ = binding.value
    el.__copyHandler__ = handler
    // 绑定事件
    el.addEventListener(event, handler)
  },

  updated(el: CopyElement, binding: DirectiveBinding) {
    // 当绑定的值更新时，更新存储的值
    el.__copyValue__ = binding.value
  },

  beforeUnmount(el: CopyElement) {
    // 清理事件监听器，避免内存泄漏
    if (el.__copyHandler__) {
      el.removeEventListener('click', el.__copyHandler__)
      delete el.__copyHandler__
      delete el.__copyValue__
    }
  },
}

export default copy
