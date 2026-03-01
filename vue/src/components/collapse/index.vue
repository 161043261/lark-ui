<script setup lang="ts">
import { provide, ref, toRefs, watch } from 'vue'
import { COLLAPSE_CONTEXT_KEY, type IContext, type IEmits, type IProps, type TName } from './types'

defineOptions({
  name: 'LarkCollapse',
})

const props = defineProps<IProps>()
const emits = defineEmits<IEmits>()
const modelValue = defineModel<TName[]>({ required: true })
// const modelValue = toRef(props, 'modelValue');
const { accordion } = toRefs(props)

const activeNames = ref<TName[]>([])

// watch(() => props.modelValue, () => {
watch(modelValue, () => {
  activeNames.value = modelValue.value
})

const setActiveNames = (names: TName[]) => {
  activeNames.value = names
  modelValue.value = names
  emits('change', names)
}

const handleClick = (name: TName) => {
  if (accordion.value) {
    setActiveNames(activeNames.value.length === 0 || activeNames.value[0] !== name ? [name] : [])
    return
  }

  if (activeNames.value.includes(name)) {
    setActiveNames(activeNames.value.filter((item) => item !== name))
  } else {
    setActiveNames([...activeNames.value, name])
  }
}

provide<IContext>(COLLAPSE_CONTEXT_KEY, {
  activeNames,
  handleClick,
})
</script>

<template>
  <div class="lark-collapse">
    <slot></slot>
  </div>
</template>
