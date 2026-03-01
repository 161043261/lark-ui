<script setup lang="ts">
import { ref } from 'vue'
import type { TName } from '@/components/collapse/types'
import LarkCollapse from '@/components/collapse/index.vue'
import LarkCollapseItem from '@/components/collapse/item/index.vue'

const basicActive = ref<TName[]>(['1'])
const accordionActive = ref<TName[]>(['a'])
const disabledActive = ref<TName[]>(['x'])

const handleChange = (names: TName[]) => {
  console.log('[collapse change]', names)
}
</script>

<template>
  <div class="container">
    <h3>Basic Usage (Controlled)</h3>
    <div class="meta">Active panels: {{ basicActive }}</div>
    <LarkCollapse v-model="basicActive" @change="handleChange">
      <LarkCollapseItem name="1" title="Panel 1">
        <div class="content">
          <p>This is the content area.</p>
          <p>You can place any content here, such as forms, buttons, or tips.</p>
        </div>
      </LarkCollapseItem>

      <LarkCollapseItem name="2" title="Panel 2">
        <div class="content">
          <p>Supports multi-line text.</p>
          <p>Also supports any components within the slot.</p>
        </div>
      </LarkCollapseItem>

      <LarkCollapseItem name="3" title="Panel 3">
        <div class="content">
          <p>Content of the third panel.</p>
        </div>
      </LarkCollapseItem>
    </LarkCollapse>

    <h3>Accordion Mode (Single Expand)</h3>
    <div class="meta">Active panels: {{ accordionActive }}</div>
    <LarkCollapse v-model="accordionActive" accordion @change="handleChange">
      <LarkCollapseItem name="a" title="Accordion A">
        <div class="content">
          <p>In accordion mode, only one panel can be expanded at a time.</p>
        </div>
      </LarkCollapseItem>

      <LarkCollapseItem name="b" title="Accordion B">
        <div class="content">
          <p>Click to toggle the active panel.</p>
        </div>
      </LarkCollapseItem>

      <LarkCollapseItem name="c" title="Accordion C">
        <div class="content">
          <p>Content of the third panel.</p>
        </div>
      </LarkCollapseItem>
    </LarkCollapse>

    <h3>Disabled Items</h3>
    <div class="meta">Active panels: {{ disabledActive }}</div>
    <LarkCollapse v-model="disabledActive" @change="handleChange">
      <LarkCollapseItem name="x" title="Expandable Item">
        <div class="content">
          <p>This item can be expanded and collapsed normally.</p>
        </div>
      </LarkCollapseItem>

      <LarkCollapseItem name="y" title="Disabled Item (Click Ignored)" disabled>
        <div class="content">
          <p>This item is disabled. Clicking the header will not toggle it.</p>
        </div>
      </LarkCollapseItem>
    </LarkCollapse>
  </div>
</template>

<style scoped>
.container {
  padding: 1.25rem;
  max-width: 42rem;

  h3 {
    margin: 1.25rem 0 0.625rem;
    font-size: 1rem;
    color: #333;
  }

  .meta {
    margin-bottom: 0.75rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: #666;
  }

  .content {
    padding: 0.75rem 0;

    p {
      margin: 0 0 0.5rem;
      font-size: 0.875rem;
      line-height: 1.5rem;
      color: #333;
    }
  }
}
</style>
