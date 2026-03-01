<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { IProps } from './types'
import { computed } from 'vue'

defineOptions({
  name: 'LarkIcon',
})

const props = defineProps<IProps>()
const propsNoColor = computed(() => ({
  ...props,
  color: undefined,
}))

const style = computed(() => {
  const { color } = props
  if (color) {
    return { color }
  }
  return {}
})
</script>

<template>
  <div class="lark-icon" :style="style">
    <FontAwesomeIcon v-bind="propsNoColor" />
  </div>
</template>
