import { computed, ref } from 'vue'

function createUseZIndex() {
  const deltaIndex = ref(0)

  return (initialIndex = 2000) => {
    const zIndex = computed(() => initialIndex + deltaIndex.value)
    const nextZIndex = () => {
      deltaIndex.value++
      return zIndex.value
    }

    return {
      zIndex,
      nextZIndex,
    }
  }
}

function createUseZIndexV2() {
  let deltaIndex = 0

  return (initialIndex = 2000) => {
    const zIndex = () => initialIndex + deltaIndex
    const nextZIndex = () => {
      deltaIndex++
      return zIndex()
    }

    return {
      zIndex,
      nextZIndex,
    }
  }
}

const useZIndex = createUseZIndex()
const useZIndexV2 = createUseZIndexV2()

export { useZIndex, useZIndexV2 }
