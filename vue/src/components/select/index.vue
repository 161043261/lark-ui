<script setup lang="ts">
import { computed, reactive, toRefs } from 'vue'
import {
  DEFAULT_TIMEOUT,
  type IEmits,
  type IProps,
  type IStates,
  type ISelectOption,
} from './types'

const modelValue = defineModel<string>({ required: true })

defineOptions({
  name: 'LarkSelect',
})

const props = withDefaults(defineProps<IProps>(), {
  clearable: false,
  options: () => [],
})

const { remote, options } = toRefs(props)

const emits = defineEmits<IEmits>()

const timeout = computed(() => (remote.value ? DEFAULT_TIMEOUT : 0))

const findOption = (value: string): ISelectOption | null => {
  const option = options.value.find((item) => item.value === value)
  return option ?? null
}

const initialOption = findOption(modelValue.value)

const states = reactive<IStates>({
  inputValue: initialOption ? initialOption.label : '',
  selectedOption: initialOption,
  mouseHover: false,
  loading: false,
})

// const toolTipRef = ref();
</script>

<template>
  <div></div>
</template>
