import type { IconProp } from '@fortawesome/fontawesome-svg-core'
import type { ButtonHTMLAttributes } from 'react'

type TNativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

type TButtonProps = Pick<TNativeButtonProps, 'children' | 'className' | 'onClick'> &
  Partial<Pick<TNativeButtonProps, 'disabled'>>

export interface IProps extends TButtonProps {
  type?: 'primary' | 'success' | 'info' | 'warning' | 'error'
  size?: 'small' | 'medium' | 'large'
  nativeType?: TNativeButtonProps['type']
  plain?: boolean
  round?: boolean
  circle?: boolean
  loading?: boolean
  icon?: IconProp
  // disabled, children, className, onClick
}
