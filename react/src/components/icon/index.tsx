import { useMemo } from 'react'
import type { IProps } from './types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { PropsWithClassName } from '@/types'
import classNames from 'classnames'

function LarkIcon(props: PropsWithClassName<IProps>) {
  const { color, className } = props
  const propsNoColor = useMemo(
    () => ({
      ...props,
      color: undefined,
    }),
    [props],
  )

  const style = useMemo(() => {
    if (color) {
      return { color }
    }
    return {}
  }, [color])

  return (
    <div className={classNames(className, 'lark-icon')} style={style}>
      <FontAwesomeIcon {...propsNoColor} />
    </div>
  )
}

export default LarkIcon
