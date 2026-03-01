import type { RuleItem } from 'async-validator'
import type { DeepReadonly, InjectionKey, VNode } from 'vue'

export interface IProps {
  rules: TFormRules
  trigger?: 'blur' | 'change'
}

export interface IFormItemRule extends RuleItem {
  // blur 失去焦点时, 触发表单校验
  // change 表单项的值改变时, 触发表单校验
  trigger?: IProps['trigger']
}

export type TFormRules<T = Record<string, unknown>> = Partial<Record<keyof T, IFormItemRule[]>>

export interface IFormContext extends DeepReadonly<IProps> {
  // const modelValue = defineModel<Record<string, unknown>>()
  modelValue: Record<string, unknown>

  addField: (itemContext: IFormItemContext) => void
  removeField: (itemContext: IFormItemContext) => void
  resetFields: (fields?: string[]) => void
  clearValidates: (fields?: string[]) => void
  validates: () => Promise<void>
  setModelValue: (field: string, value: unknown) => void
}

export interface IFormItemContext {
  el: HTMLDivElement | null
  field: string
  resetField: () => void
  clearValidate: () => void
  validate: () => Promise<void>
}

export const FORM_CONTEXT_KEY: InjectionKey<IFormContext> = Symbol('FORM_CONTEXT_KEY')
export const FORM_ITEM_CONTEXT_KEY: InjectionKey<IFormItemContext> = Symbol('FORM_ITEM_CONTEXT_KEY')

export type TFormExpose = Pick<IFormContext, 'validates' | 'resetFields' | 'clearValidates'>

export interface IItemProps {
  label: string
  field: string
  showErrorMsg?: boolean
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
  default: (props: { validate: IItemExpose['validate'] }) => VNode
  label: (props: { label: string }) => VNode
}
