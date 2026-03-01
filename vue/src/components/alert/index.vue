<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
import type { IEmits, IProps } from './types'
import LarkIcon from '@/components/icon/index.vue'

defineOptions({
  name: 'LarkAlert',
})

const props = withDefaults(defineProps<IProps>(), {
  closable: true,
  effect: 'light',
})

const { type, center, effect } = toRefs(props)

const emits = defineEmits<IEmits>()

const computedClass = computed(() => {
  return [`lark-alert--${type.value}`, `lark-alert--${effect.value}`, { 'is-center': center }]
})

const alive = ref(true)

const handleClose = (e: MouseEvent) => {
  alive.value = false
  emits('close', e)
}

const alertIcon = computed(() => {
  switch (type.value) {
    case 'error': {
      return 'circle-xmark'
    }
    case 'info': {
      return 'circle-info'
    }
    case 'success': {
      return 'circle-check'
    }
    case 'warning': {
      return 'circle-exclamation'
    }
    default: {
      return 'circle-info'
    }
  }
})
</script>

<template>
  <!-- name 是 CSS 类选择器名的前缀, 默认值是 v- -->
  <!-- v-[enter | leave]-[from | active | to] -->
  <Transition name="fade">
    <div class="lark-alert" :class="computedClass" v-if="alive">
      <div class="lark-alert__content">
        <span v-if="showIcon" class="lark-alert__icon">
          <!-- .stop: event.stopPropagation() -->
          <LarkIcon :icon="alertIcon" @click.stop="alive = false" />
        </span>

        <div class="lark-alert__message">
          <p class="lark-alert__title">
            {{ title }}
          </p>

          <p v-if="description" class="lark-alert__description">
            {{ description }}
          </p>
        </div>
      </div>

      <!-- <template /> 类似 React Fragment </> -->
      <template v-if="closable">
        <div v-if="closeText" @click="handleClose" class="close-btn">{{ closeText }}</div>
        <LarkIcon v-else icon="xmark" @click="handleClose" class="close-btn" />
      </template>
    </div>
  </Transition>
</template>
