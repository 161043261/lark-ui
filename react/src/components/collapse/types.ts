import { createContext } from 'react'

export interface IContext {
  activeNames: TName[]
  handleClick: (name: TName) => void
}

export interface IProps {
  activeNames: TName[]
  onChange?: (names: TName[]) => void
  accordion?: boolean
}

export const Context = createContext<IContext | null>(null)

export type TName = string | number

export interface IItemProps {
  name: TName
  title?: string
  disabled?: boolean
}
