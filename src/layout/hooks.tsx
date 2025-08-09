export function useLayoutHook() {
  const route = useRoute()

  const showFooter = computed(() => {
    return route.meta?.showFooter ?? false
  })

  return {
    showFooter,
  }
}
