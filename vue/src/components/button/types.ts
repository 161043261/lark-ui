export type TButtonType = 'primary' | 'success' | 'info' | 'warning' | 'error'
export type TButtonSize = 'small' | 'medium' | 'large'
export type TNativeType = 'button' | 'submit' | 'reset'

export interface IProps {
  type?: TButtonType
  size?: TButtonSize
  nativeType?: TNativeType
  plain?: boolean
  round?: boolean
  circle?: boolean
  disabled?: boolean
  autofocus?: boolean
  loading?: boolean
  icon?: string
}
