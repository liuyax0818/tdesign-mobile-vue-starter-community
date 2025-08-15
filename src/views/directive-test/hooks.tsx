export function useDirectiveTest() {
  // Copy 测试
  const copyText = ref('这是一个可复制的文本')

  // Touch 测试
  const tapCount = ref(0)
  const longpressResult = ref('')
  const swipeResult = ref('')

  function handleTap() {
    tapCount.value++
  }

  function handleLongPress() {
    longpressResult.value = '长按成功!'
    setTimeout(() => {
      longpressResult.value = ''
    }, 2000)
  }

  function handleSwipe(direction: string) {
    swipeResult.value = `滑动: ${direction}`
    setTimeout(() => {
      swipeResult.value = ''
    }, 2000)
  }

  return {
    // Copy 相关
    copyText,

    // Touch 相关
    tapCount,
    longpressResult,
    swipeResult,
    handleTap,
    handleLongPress,
    handleSwipe,
  }
}
