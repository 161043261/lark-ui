import type { PropsWithClassName } from '@/types'
import { Context, type IContext, type IProps, type TName } from './types'
import { useEffect, useMemo, useState, type PropsWithChildren } from 'react'
import classNames from 'classnames'

function LarkCollapse(props: PropsWithClassName<PropsWithChildren<IProps>>) {
  const { className, accordion, onChange, children } = props
  const [activeNames, setActiveNames] = useState<TName[]>(props.activeNames)

  useEffect(() => {
    setActiveNames(props.activeNames)
  }, [props])

  const handleClick = (name: TName) => {
    let newActiveNames: TName[] = []
    if (accordion) {
      newActiveNames = activeNames.length === 0 || activeNames[0] !== name ? [name] : []
    } else {
      newActiveNames = activeNames.includes(name)
        ? activeNames.filter((item) => item !== name)
        : [...activeNames, name]
    }

    if (onChange) {
      onChange(newActiveNames)
    } else {
      setActiveNames(newActiveNames)
    }
  }

  const contextValue = useMemo<IContext>(() => {
    return {
      activeNames,
      handleClick,
    }
  }, [activeNames])

  return (
    <Context.Provider value={contextValue}>
      <div className={classNames(className, 'lark-collapse')}>{children}</div>
    </Context.Provider>
  )
}

export default LarkCollapse
