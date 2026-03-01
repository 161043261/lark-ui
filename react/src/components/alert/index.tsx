import { useMemo, useRef, useState } from 'react'
import type { IProps } from './types'
import { CSSTransition } from 'react-transition-group'
import classNames from 'classnames'
import LarkIcon from '@/components/icon'
import type { PropsWithClassName } from '@/types'
import type { MouseEvent } from 'react'

function LarkAlert(props: PropsWithClassName<IProps>) {
  const {
    closable = true,
    effect = 'light',
    type,
    center,
    showIcon,
    title,
    description,
    closeText,
    className,
    onClose,
  } = props

  const computedClass = useMemo(
    () => [
      `lark-alert--${type}`,
      `lark-alert--${effect}`,
      {
        'is-center': center,
      },
    ],
    [type, effect, center],
  )

  const [alive, setAlive] = useState(true)

  const alertIcon = useMemo(() => {
    switch (type) {
      case 'error': {
        return 'circle-xmark'
      }
      case 'info': {
        return 'circle-info'
      }
      case 'success': {
        return 'circle-check'
      }
      case 'warning': {
        return 'circle-exclamation'
      }
      default: {
        return 'circle-info'
      }
    }
  }, [type])

  const handleClose = (e: MouseEvent) => {
    setAlive(false)
    onClose?.(e)
  }

  const nodeRef = useRef<HTMLDivElement | null>(null)

  return (
    <CSSTransition nodeRef={nodeRef} classNames="fade" in={alive} unmountOnExit timeout={200}>
      <div className={classNames(className, 'lark-alert', computedClass)} ref={nodeRef}>
        <div className="lark-alert__content">
          {showIcon && (
            <span className="lark-alert__icon">
              <LarkIcon
                icon={alertIcon}
                onClick={() => {
                  setAlive(false)
                }}
              />
            </span>
          )}

          <div className="lark-alert__message">
            <p className="lark-alert__title">{title}</p>

            {description && <p className="lark-alert__description">{description}</p>}
          </div>
        </div>

        {closable &&
          (closeText ? (
            <div onClick={handleClose} className="close-btn">
              {closeText}
            </div>
          ) : (
            <LarkIcon icon="xmark" onClick={handleClose} className="close-btn" />
          ))}
      </div>
    </CSSTransition>
  )
}

export default LarkAlert
