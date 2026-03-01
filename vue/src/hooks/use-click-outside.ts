import { onMounted, onUnmounted, type Ref } from 'vue'

function useClickOutside(nodeRef: Ref<HTMLElement | null>, cb: (e: MouseEvent) => void) {
  const handler = (e: MouseEvent) => {
    if (nodeRef.value && e.target) {
      if (!nodeRef.value.contains(e.target as HTMLElement)) {
        cb(e)
      }
    }
  }

  onMounted(() => {
    document.addEventListener('click', handler)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
}

export default useClickOutside
