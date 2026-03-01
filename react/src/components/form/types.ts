import type { RuleItem } from 'async-validator'
import {
  createContext,
  type Dispatch,
  type ReactElement,
  type Ref,
  type SetStateAction,
} from 'react'

export interface IProps<T = Record<string, unknown>> {
  rules: TFormRules<T>
  trigger?: 'blur' | 'change'
  initialValue: T
  ref: Ref<TFormExpose>
}

export interface IFormItemRule extends RuleItem {
  // blur 失去焦点时, 触发表单校验
  // change 表单项的值改变时, 触发表单校验
  trigger?: IProps['trigger']
}

export type TFormRules<T = Record<string, unknown>> = Partial<Record<keyof T, IFormItemRule[]>>

export interface IFormContext<T = Record<string, unknown>> extends Readonly<
  Pick<IProps, 'rules' | 'trigger'>
> {
  formData: T
  setFormData: Dispatch<SetStateAction<T>>
  addField: (itemContext: IFormItemContext) => void
  removeField: (itemContext: IFormItemContext) => void
  resetFields: (fields?: string[]) => void
  clearValidates: (fields?: string[]) => void
  validates: () => Promise<void>
}

export interface IFormItemContext {
  el: HTMLDivElement | null
  field: string
  resetField: () => void
  clearValidate: () => void
  validate: () => Promise<void>
}

export type TFormExpose = Pick<IFormContext, 'validates' | 'resetFields' | 'clearValidates'>

export interface IItemProps {
  field: string
  showErrorMsg?: boolean
  label?: string | ReactElement
}

export interface IValidateStatus {
  state: 'idle' | 'validating' | 'error'
  errorMsg: string
}

export interface IItemExpose {
  validateStatus: IValidateStatus
  resetField: () => void
  clearValidate: () => void
  validate: () => Promise<void>
}

export interface IItemSlots {
  default: ReactElement
  label: ReactElement
}

export const FormContext = createContext<IFormContext>({} as IFormContext)
export const FormItemContext = createContext<IFormItemContext>({} as IFormItemContext)
