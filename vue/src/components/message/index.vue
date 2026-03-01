<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, toRefs, useTemplateRef } from 'vue'
import { getPrevBottomOffset, type IExpose, type IProps } from './types'
import LarkComponent from '@/components/common'
import LarkIcon from '@/components/icon/index.vue'

const props = withDefaults(defineProps<IProps>(), {
  type: 'info',
  duration: 3000,
  offset: 20,
})

defineOptions({
  name: 'LarkMessage',
})

const { id, offset, zIndex, duration, type, showClose } = toRefs(props)
const nodeRef = useTemplateRef('message-ref')
const alive = ref(true)
const height = ref(0)

const topOffset = computed(() => {
  return getPrevBottomOffset(id.value) + offset.value
})

const bottomOffset = computed(() => {
  return topOffset.value + height.value
})

defineExpose<IExpose>({
  bottomOffset: bottomOffset.value,
  alive,
})

const computedClass = computed(() => ({
  [`lark-message--${type.value}`]: type.value,
  'has-close': showClose.value,
}))

const computedStyle = computed(() => ({
  top: `${topOffset.value}px`,
  zIndex: zIndex.value,
}))

let timer: number | null = null

const startTimer = () => {
  // return
  if (duration.value === 0) {
    return
  }
  timer = setTimeout(() => {
    alive.value = false
  }, duration.value)
}

const clearTimer = () => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    alive.value = false
  }
}

document.addEventListener('keydown', handleKeyDown)

onMounted(() => {
  alive.value = true
  startTimer()
})

onUnmounted(() => {
  clearTimer()
  document.removeEventListener('keydown', handleKeyDown)
})

const handleEnter = () => {
  height.value = nodeRef.value?.getBoundingClientRect().height ?? 0
}

const handleAfterLeave = () => {
  props.onClose?.()
}
</script>

<template>
  <Transition
    name="fade-up"
    @after-leave="handleAfterLeave"
    @enter="handleEnter"
    :duration="duration"
  >
    <div
      class="lark-message"
      v-if="alive"
      :class="computedClass"
      ref="message-ref"
      :style="computedStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <div class="lark-message__content">
        <LarkComponent v-if="message" :element="message" />
      </div>

      <div class="lark-message__close" v-if="showClose">
        <LarkIcon @click.stop="alive = false" icon="xmark" />
      </div>
    </div>
  </Transition>
</template>
