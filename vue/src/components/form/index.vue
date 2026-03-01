<script setup lang="ts">
import { provide, readonly } from 'vue'
import {
  FORM_CONTEXT_KEY,
  type IProps,
  type IFormContext,
  type IFormItemContext,
  type TFormExpose,
} from './types'

defineOptions({
  name: 'LarkForm',
})

const modelValue = defineModel<Record<string, unknown>>({
  required: true,
})

const props = withDefaults(defineProps<IProps>(), {
  trigger: 'blur',
})

const itemContexts: IFormItemContext[] = []

const addField: IFormContext['addField'] = (ctx: IFormItemContext) => {
  itemContexts.push(ctx)
}

const removeField: IFormContext['removeField'] = (ctx: IFormItemContext) => {
  itemContexts.splice(itemContexts.indexOf(ctx), 1)
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

defineExpose<TFormExpose>({
  resetFields,
  validates,
  clearValidates,
})

provide<IFormContext>(FORM_CONTEXT_KEY, {
  ...readonly(props),
  modelValue: modelValue.value,
  addField,
  removeField,
  resetFields,
  clearValidates,
  validates,
  setModelValue(field: keyof typeof modelValue.value, value: unknown) {
    modelValue.value[field] = value
  },
})
</script>

<template>
  <form class="lark-form">
    <slot></slot>
  </form>
</template>
