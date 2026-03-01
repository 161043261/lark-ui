<script lang="ts" setup>
import routes from '@/router/routes'
</script>

<template>
  <ul>
    <li v-for="{ path, name } of routes" :key="path">
      <RouterLink :to="path">{{ name }}</RouterLink>
    </li>
  </ul>
</template>
