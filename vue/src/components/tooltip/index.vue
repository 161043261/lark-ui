<script setup lang="ts">
import debounce from '@/utils/debounce'
import { DEFAULT_CLOSE_DELAY, type ITooltipInstance, type IEmits, type IProps } from './types'
import { createPopper, type Instance, type Options } from '@popperjs/core'
import {
  computed,
  onUnmounted,
  ref,
  toRefs,
  useTemplateRef,
  watch,
  type ComputedRef,
  type Ref,
} from 'vue'
import { useClickOutside } from '@/hooks'

defineOptions({
  name: 'LarkTooltip',
})

const props = withDefaults(defineProps<IProps>(), {
  placement: 'bottom',
  trigger: 'hover',
  transition: 'fade',
  openDelay: 0,
  closeDelay: 0,
})

// manual.value: true 手动控制, 用户交互不会触发 Tooltip 的显示和隐藏
// manual.value: false 自动控制, 用户交互会触发 Tooltip 的显示和隐藏
const { placement, trigger, manual, openDelay } = toRefs(props)

const emits = defineEmits<IEmits>()

const isOpen = ref(false)
const popperNode = ref<HTMLElement | null>(null)
const triggerNode = ref<HTMLElement | null>(null)
const popperContainer = useTemplateRef<HTMLDivElement>('popper-container-node')

let popperInstance: Instance | null = null

const innerEvents: Ref<{
  mouseenter?: (e: MouseEvent) => void
  click?: (e: MouseEvent) => void
}> = ref({})

const outerEvents: Ref<{
  mouseleave?: (e: MouseEvent) => void
}> = ref({})

const dropdownEvents: Ref<{
  mouseenter?: (e: MouseEvent) => void
}> = ref({})

const closeDelay = computed(() =>
  trigger.value === 'hover' && props.closeDelay === 0 ? DEFAULT_CLOSE_DELAY : props.closeDelay,
)

const popperOptions: ComputedRef<Options> = computed(() => {
  return {
    placement: placement.value,
    strategy: 'absolute',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
    ...props.popperOptions,
  }
})

const debouncedOpen = debounce(() => {
  isOpen.value = true
  emits('visibleChange', true)
}, openDelay.value)

const debouncedClose = debounce(() => {
  isOpen.value = false
  emits('visibleChange', false)
}, closeDelay.value)

const handleOpen = () => {
  debouncedClose.cancel()
  debouncedOpen()
}

const handleClose = () => {
  debouncedOpen.cancel()
  debouncedClose()
}

const togglePopper = () => {
  if (isOpen.value) {
    handleClose()
  } else {
    handleOpen()
  }
}

useClickOutside(popperContainer, () => {
  if (isOpen.value) {
    emits('clickOutside', true)
    if (trigger.value === 'click' && !manual.value) {
      handleClose()
    }
  }
})

const clearEvents = () => {
  innerEvents.value = {}
  outerEvents.value = {}
  dropdownEvents.value = {}
}

const attachEvents = () => {
  clearEvents()
  switch (trigger.value) {
    case 'hover':
      innerEvents.value.mouseenter = handleOpen
      outerEvents.value.mouseleave = handleClose
      dropdownEvents.value.mouseenter = handleOpen
      break
    case 'click':
      innerEvents.value.click = togglePopper
      break
  }
}

if (!manual.value) {
  attachEvents()
}

watch([manual, trigger], ([manualVal, triggerVal], [, triggerValOld]) => {
  // 手动控制
  if (manualVal) {
    clearEvents()
    return
  }

  if (!manualVal || triggerVal !== triggerValOld) {
    attachEvents()
  }
})

watch(
  [isOpen],
  (val) => {
    if (val) {
      if (triggerNode.value && popperNode.value) {
        popperInstance = createPopper(
          triggerNode.value, // reference
          popperNode.value, // popper
          popperOptions.value, // options
        )
      }
    }
  },
  { flush: 'post' },
)

onUnmounted(() => {
  popperInstance?.destroy()
})

defineExpose<ITooltipInstance>({
  show: handleOpen,
  hide: handleClose,
})
</script>

<template>
  <div class="lark-tooltip" ref="popper-container-node" v-on="outerEvents">
    <div class="lark-tooltip__trigger" ref="trigger-node" v-on:="innerEvents">
      <slot></slot>
    </div>
    <Transition :name="transition">
      <div v-if="isOpen" class="lark-tooltip__popper" ref="popper-node" v-on="dropdownEvents">
        <slot name="content">
          {{ content }}
        </slot>
        <!-- <div id="arrow" data-popper-arrow></div> -->
      </div>
    </Transition>
  </div>
</template>
