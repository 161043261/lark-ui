import type { InjectionKey, Ref } from 'vue'

export interface IContext {
  activeNames: Ref<TName[]>
  handleClick: (name: TName) => void
}

export interface IProps {
  // 是否开启手风琴模式, 即同时只能展开一个折叠项
  accordion?: boolean
}

export interface IEmits {
  (eventName: 'change', value: TName[]): void
}

export const COLLAPSE_CONTEXT_KEY: InjectionKey<IContext> = Symbol('COLLAPSE_CONTEXT_KEY')

export type TName = string | number

export interface IItemProps {
  name: TName
  title?: string
  disabled?: boolean
}
