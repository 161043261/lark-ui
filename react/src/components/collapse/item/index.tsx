import type { PropsWithClassName } from '@/types'
import { Context, type IItemProps } from '../types'
import classNames from 'classnames'
import { useContext, useMemo, type PropsWithChildren } from 'react'
import LarkIcon from '@/components/icon'
import { useDisplayNone } from '@/hooks'

function LarkCollapseItem(props: PropsWithClassName<PropsWithChildren<IItemProps>>) {
  const { disabled, name, title, className, children } = props
  const contextValue = useContext(Context)

  const isActive = useMemo(() => {
    if (!contextValue) {
      return false
    }
    return contextValue.activeNames.includes(name)
  }, [contextValue, name])

  const handleClick = () => {
    if (disabled) {
      return
    }
    contextValue?.handleClick(name)
  }

  return (
    <div
      className={classNames(className, 'lark-collapse-item', {
        'is-disabled': disabled,
      })}
    >
      <div
        className={classNames('lark-collapse-item__title', {
          'is-active': isActive,
        })}
        onClick={handleClick}
      >
        <span>{title}</span>
        <LarkIcon icon="angle-right" />
      </div>

      {useDisplayNone(isActive, <div className="lark-collapse-item__content">{children}</div>)}
    </div>
  )
}

export default LarkCollapseItem
