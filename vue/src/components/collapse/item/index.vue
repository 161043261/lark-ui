<script setup lang="ts">
import { COLLAPSE_CONTEXT_KEY, type IItemProps } from '../types'
import type { IContext } from '../types'
import { computed, inject, toRefs } from 'vue'
import LarkIcon from '@/components/icon/index.vue'

defineOptions({
  name: 'LarkCollapseItem',
})

const props = defineProps<IItemProps>()
const { disabled, name } = toRefs(props)
const context = inject<IContext>(COLLAPSE_CONTEXT_KEY)

const isActive = computed(() => {
  return context?.activeNames.value.includes(name.value)
})

const handleClick = () => {
  if (disabled.value) {
    return
  }
  context?.handleClick(name.value)
}
</script>

<template>
  <div class="lark-collapse-item" :class="{ 'is-disabled': disabled }">
    <div class="lark-collapse-item__title" :class="{ 'is-active': isActive }" @click="handleClick">
      <span>{{ title }}</span>
      <LarkIcon icon="angle-right" />
    </div>

    <div class="lark-collapse-item__content" v-show="isActive">
      <slot></slot>
    </div>
  </div>
</template>
