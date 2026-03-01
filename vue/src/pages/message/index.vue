<script lang="ts" setup>
import LarkButton from '@/components/button/index.vue'
import LarkToast from '@/components/message/toast'
</script>

<template>
  <LarkButton type="success" @click="LarkToast.success('Success')">Success</LarkButton>
  <LarkButton type="error" @click="LarkToast.error('Error')">Error</LarkButton>
  <LarkButton type="warning" @click="LarkToast.warning('Warning')">Warning</LarkButton>
  <LarkButton type="info" @click="LarkToast.info('Info')">Info</LarkButton>
  <LarkButton type="success" plain @click="LarkToast.closeAll()">Close All</LarkButton>
</template>
