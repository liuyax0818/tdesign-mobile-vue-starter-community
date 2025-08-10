export function useBannerHook() {
  const openCatalog = ref<boolean>(false)
  const router = useRouter()

  function handleOpenCatalog() {
    openCatalog.value = true
  }

  function handleBack() {
    router.back()
  }

  return {
    openCatalog,
    handleBack,
    handleOpenCatalog,
  }
}
