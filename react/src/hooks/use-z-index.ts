function createUseZIndex() {
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

export default useZIndex
