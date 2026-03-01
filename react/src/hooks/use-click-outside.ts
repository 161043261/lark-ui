import { useEffect, type RefObject } from 'react'

// type Ref<T> = RefCallback<T> | RefObject<T | null> | null;
// RefCallback
function useClickOutside(nodeRef: RefObject<HTMLElement | null>, cb: (e: MouseEvent) => void) {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (nodeRef.current && e.target) {
        if (!nodeRef.current.contains(e.target as HTMLElement)) {
          cb(e)
        }
      }
    }

    document.addEventListener('click', handler)
    return () => {
      document.removeEventListener('click', handler)
    }
  }, [cb])
}

export default useClickOutside
