<script setup lang="ts">
import { computed } from 'vue'
import type { IProps } from './types'
import LarkIcon from '@/components/icon/index.vue'

defineOptions({
  name: 'LarkButton',
})

const props = withDefaults(defineProps<IProps>(), {
  type: 'primary',
  size: 'medium',
})

const computedClass = computed(() => {
  return [
    `lark-button--${props.type}`,
    `lark-button--${props.size}`,
    {
      'is-round': props.round,
      'is-circle': props.circle,
      'is-disabled': props.disabled,
      'is-plain': props.plain,
    },
  ]
})
</script>

<template>
  <button class="lark-button" :class="computedClass" :type="nativeType">
    <LarkIcon icon="spinner" v-if="loading" spin />
    <LarkIcon :icon="icon" v-if="icon" />
    <span>
      <slot></slot>
    </span>
  </button>
</template>
