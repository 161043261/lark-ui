import { useImperativeHandle, useState, type PropsWithChildren } from 'react'
import {
  FormContext,
  type IFormContext,
  type IFormItemContext,
  type IProps,
  type TFormExpose,
} from './types'

function LarkForm<T = Record<string, unknown>>(props: PropsWithChildren<IProps<T>>) {
  const { children, trigger = 'blur', ref, initialValue, rules } = props

  const [itemContexts, setItemContexts] = useState<IFormItemContext[]>([])

  const addField: IFormContext['addField'] = (ctx: IFormItemContext) => {
    itemContexts.push(ctx)
    setItemContexts([...itemContexts])
  }

  const removeField: IFormContext['removeField'] = (ctx: IFormItemContext) => {
    itemContexts.splice(itemContexts.indexOf(ctx), 1)
    setItemContexts([...itemContexts])
  }

  const resetFields: IFormContext['resetFields'] = (fields: string[] = []) => {
    const contexts =
      fields.length > 0
        ? itemContexts.filter((context) => fields.includes(context.field))
        : itemContexts
    contexts.forEach((ctx) => ctx.resetField())
  }

  const clearValidates: IFormContext['clearValidates'] = (fields: string[] = []) => {
    const contexts =
      fields.length > 0
        ? itemContexts.filter((context) => fields.includes(context.field))
        : itemContexts
    contexts.forEach((ctx) => ctx.clearValidate())
  }

  const validates: IFormContext['validates'] = async () => {
    const aggregateErrors = []
    for (const ctx of itemContexts) {
      try {
        await ctx.validate()
      } catch (err) {
        aggregateErrors.push(err)
      }
    }
    if (aggregateErrors.length === 0) {
      return
    }
    throw aggregateErrors
  }

  useImperativeHandle<TFormExpose, TFormExpose>(ref, () => {
    return {
      validates,
      resetFields,
      clearValidates,
    }
  }, [props])

  const [formData, setFormData] = useState(initialValue)

  const contextValue = {
    rules,
    trigger,
    formData,
    setFormData,
    addField,
    removeField,
    resetFields,
    clearValidates,
    validates,
  } as IFormContext

  return (
    <form className="lark-form">
      <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
    </form>
  )
}

export default LarkForm
