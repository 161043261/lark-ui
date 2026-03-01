<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
<template>
  <RouterLink v-if="route.path !== '/'" to="/">Index</RouterLink>
  <RouterView />
</template>
