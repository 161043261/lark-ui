import type { VNode } from 'vue'

export type TRenderFunc = (option: ISelectOption) => VNode
export type TFilterFunc = (value: string) => ISelectOption[]
export type TRemoteFunc = (value: string) => Promise<ISelectOption[]>

export interface ISelectOption {
  label: string
  value: string
  disabled?: boolean
}

export interface IProps {
  options: ISelectOption[]
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  renderLabel?: TRenderFunc
  filterable?: boolean
  filterFunc?: TFilterFunc
  remote?: boolean
  remoteFunc?: TRemoteFunc
}

export interface IEmits {
  (eventName: 'change', value: string): void
  (eventName: 'visibleChange', value: boolean): void
  (eventName: 'clear'): void
}

export interface IStates {
  inputValue: string
  selectedOption: ISelectOption | null
  mouseHover: boolean
  loading: boolean
}

export const DEFAULT_TIMEOUT = 300
