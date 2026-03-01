<script setup lang="ts">
import {
  computed,
  inject,
  onMounted,
  onUnmounted,
  provide,
  reactive,
  toRef,
  useTemplateRef,
} from 'vue'
import type { IItemExpose, IItemProps, IItemSlots, IValidateStatus } from '../types'
import {
  FORM_CONTEXT_KEY,
  FORM_ITEM_CONTEXT_KEY,
  type IFormContext,
  type IFormItemContext,
  type IFormItemRule,
} from '../types'
import AsyncValidator, { type RuleItem, type ValidateError } from 'async-validator'

defineOptions({
  name: 'LarkFormItem',
})

const props = withDefaults(defineProps<IItemProps>(), {
  showErrorMsg: true,
})

const field = toRef(props, 'field')

const formContext = inject<IFormContext>(FORM_CONTEXT_KEY)

const validateStatus = reactive<IValidateStatus>({
  state: 'idle',
  errorMsg: '',
})

const ref = useTemplateRef('lark-form-item')

const itemValue = computed(() => {
  if (!formContext) {
    return null
  }
  const { modelValue } = formContext
  if (field.value in modelValue) {
    return modelValue[field.value]
  }
  return null
})

const itemRules = computed(() => {
  if (!formContext) {
    return []
  }
  const { rules } = formContext
  if (field.value in rules) {
    return rules[field.value]
  }
  return []
})

const isRequired = computed<boolean>(() => {
  return itemRules.value?.some((rule) => rule.required) ?? false
})

const getTriggeredRules = (trigger?: IFormItemRule['trigger']): RuleItem[] => {
  return (
    (itemRules.value?.filter((rule) => {
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
    [field.value]: triggeredRules,
  })
  validateStatus.state = 'validating'
  try {
    await validator.validate({ [field.value]: itemValue.value })
    validateStatus.state = 'idle'
    return
  } catch (err) {
    const { errors } = err as { errors: ValidateError[] }
    validateStatus.state = 'error'
    validateStatus.errorMsg = errors.map((e) => e.message).join('\n')
    throw errors.map((e) => e.message)
  }
}

const clearValidate: IItemExpose['clearValidate'] = () => {
  validateStatus.state = 'idle'
  validateStatus.errorMsg = ''
}

let initialVal: unknown = undefined

const resetField: IItemExpose['resetField'] = () => {
  clearValidate()
  if (!formContext) {
    return
  }
  const { modelValue } = formContext
  if (field.value in modelValue) {
    formContext.setModelValue(field.value, initialVal)
  }
}

const formItemContext: IFormItemContext = {
  el: ref.value,
  field: field.value,
  validate,
  clearValidate,
  resetField,
}

provide(FORM_ITEM_CONTEXT_KEY, formItemContext)

onMounted(() => {
  formContext?.addField(formItemContext)
  initialVal = itemValue.value
})

onUnmounted(() => {
  formContext?.removeField(formItemContext)
})

defineExpose<IItemExpose>({
  validateStatus,
  validate,
  clearValidate,
  resetField,
})

defineSlots<IItemSlots>()
</script>

<template>
  <div
    class="lark-form-item"
    ref="lark-form-item"
    :class="{
      'is-error': validateStatus.state === 'error',
      'is-required': isRequired,
    }"
  >
    <div class="lark-form-item__label">
      <slot name="label" :label="label">{{ label }}</slot>
    </div>
    <div class="lark-form-item__content">
      <slot :validate="validate"></slot>
      <div
        class="lark-form-item__error-msg"
        v-if="showErrorMsg && validateStatus.state === 'error'"
      >
        {{ validateStatus.errorMsg }}
      </div>
    </div>
  </div>
</template>
