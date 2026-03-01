export type PropsWithClassName<IProps> = IProps & {
  className?: string
}

export type PropsWithRef<T, IExpose> = T & {
  ref?: React.Ref<IExpose>
}
