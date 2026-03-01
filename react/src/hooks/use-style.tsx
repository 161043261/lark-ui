import { useMemo, type CSSProperties, type ReactElement } from 'react'

export function useVisibilityHidden<
  T extends {
    style: CSSProperties
  },
>(visible: boolean, element: ReactElement<T>) {
  return useMemo(() => {
    return {
      ...element,
      props: {
        ...element.props,
        style: {
          ...element.props.style,
          visibility: visible ? 'inherit' : 'hidden',
        },
      },
    }
  }, [visible, element])
}

export function useDisplayNone<
  T extends {
    style: CSSProperties
  },
>(visible: boolean, element: ReactElement<T>) {
  return useMemo(() => {
    return {
      ...element,
      props: {
        ...element.props,
        style: {
          ...element.props.style,
          display: visible ? 'inherit' : 'none',
        },
      },
    }
  }, [visible, element])
}
