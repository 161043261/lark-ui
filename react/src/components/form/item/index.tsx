import {
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react'
import {
  FormContext,
  FormItemContext,
  type IFormItemContext,
  type IFormItemRule,
  type IItemExpose,
  type IItemProps,
  type IValidateStatus,
} from '../types'
import AsyncValidator, { type RuleItem, type ValidateError } from 'async-validator'
import classNames from 'classnames'

function LarkFormItem(props: PropsWithChildren<IItemProps>) {
  const { showErrorMsg = true, field, children, label } = props

  const [validateStatus, setValidateStatus] = useState<IValidateStatus>({
    state: 'idle',
    errorMsg: '',
  })

  const ref = useRef<(HTMLDivElement & IItemExpose) | null>(null)

  const formContext = useContext(FormContext)

  const itemValue = useMemo(() => {
    const { formData } = formContext
    if (field in formData) {
      return formData[field]
    }
    return null
  }, [formContext])

  const itemRules = useMemo(() => {
    const { rules } = formContext
    if (field in rules) {
      return rules[field]
    }
    return []
  }, [formContext])

  const isRequired = useMemo<boolean>(() => {
    return itemRules?.some((rule) => rule.required) ?? false
  }, [itemRules])

  const getTriggeredRules = (trigger?: IFormItemRule['trigger']): RuleItem[] => {
    return (
      (itemRules?.filter((rule) => {
        if (!trigger || !rule.trigger) {
          return true
        }
        return rule.trigger === trigger
      }) as RuleItem[]) ?? []
    )
  }

  const validate: IItemExpose['validate'] = async () => {
    const triggeredRules = getTriggeredRules(formContext?.trigger)
    if (triggeredRules.length === 0) {
      return
    }
    const validator = new AsyncValidator({
      [field]: triggeredRules,
    })
    setValidateStatus((prev) => ({ ...prev, state: 'validating' }))
    try {
      await validator.validate({ [field]: itemValue })
      setValidateStatus((prev) => ({ ...prev, state: 'idle' }))
      return
    } catch (err) {
      const { errors } = err as { errors: ValidateError[] }
      setValidateStatus({
        state: 'error',
        errorMsg: errors.map((e) => e.message).join('\n'),
      })
      throw errors.map((e) => e.message)
    }
  }

  const clearValidate: IItemExpose['clearValidate'] = () => {
    setValidateStatus({ state: 'idle', errorMsg: '' })
  }

  let initialVal: unknown = undefined

  const resetField: IItemExpose['resetField'] = () => {
    clearValidate()
    if (!formContext) {
      return
    }
    const { formData } = formContext
    if (field in formData) {
      console.log('resetField', { [field]: initialVal })
      formContext.setFormData((prev) => ({ ...prev, [field]: initialVal }))
    }
  }

  const formItemContext: IFormItemContext = {
    el: ref.current,
    field,
    validate,
    clearValidate,
    resetField,
  }

  useEffect(() => {
    formContext?.addField(formItemContext)
    initialVal = itemValue

    return () => {
      formContext?.removeField(formItemContext)
    }
  }, [])

  useImperativeHandle<IItemExpose, IItemExpose>(ref, () => {
    return {
      validateStatus,
      validate,
      clearValidate,
      resetField,
    }
  }, [validateStatus])

  const computedClass = useMemo(
    () => ({
      'is-error': validateStatus.state === 'error',
      'is-required': isRequired,
    }),
    [validateStatus, isRequired],
  )

  return (
    <FormContext.Consumer>
      {(formContext) => (
        <div className={classNames('lark-form-item', computedClass)} ref={ref}>
          <FormItemContext.Provider value={formItemContext}>
            <div className="lark-form-item__label">{label}</div>
            <div className="lark-form-item__content">
              {children}
              {showErrorMsg && validateStatus.state === 'error' && (
                <div className="lark-form-item__error-msg">{validateStatus.errorMsg}</div>
              )}
            </div>
          </FormItemContext.Provider>
        </div>
      )}
    </FormContext.Consumer>
  )
}

export default LarkFormItem
