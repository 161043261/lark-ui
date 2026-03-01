<script setup lang="ts">
import LarkAlert from '@/components/alert/index.vue'
</script>

<template>
  <div class="container">
    <h3>Basic Usage</h3>
    <LarkAlert title="Success alert" type="success" effect="light" />
    <LarkAlert title="Info alert" type="info" effect="light" />
    <LarkAlert title="Warning alert" type="warning" effect="light" />
    <LarkAlert title="Error alert" type="error" effect="light" />

    <h3>Dark Theme</h3>
    <LarkAlert title="Success alert" type="success" effect="dark" />
    <LarkAlert title="Info alert" type="info" effect="dark" />
    <LarkAlert title="Warning alert" type="warning" effect="dark" />
    <LarkAlert title="Error alert" type="error" effect="dark" />

    <h3>With Icon</h3>
    <LarkAlert title="Alert with icon" type="success" effect="light" show-icon />
    <LarkAlert title="Alert with icon" type="info" effect="light" show-icon />
    <LarkAlert title="Alert with icon" type="warning" effect="light" show-icon />
    <LarkAlert title="Alert with icon" type="error" effect="light" show-icon />

    <h3>With Description</h3>
    <LarkAlert
      title="Alert with description"
      type="success"
      effect="light"
      description="This is a description text for the alert."
    />

    <h3>Centered</h3>
    <LarkAlert title="Centered content" type="info" effect="light" center />

    <h3>Custom Close Text</h3>
    <LarkAlert title="Custom close button" type="warning" effect="light" close-text="Got it" />

    <h3>Non-closable</h3>
    <LarkAlert title="Cannot be closed" type="error" effect="light" :closable="false" />
  </div>
</template>

<style scoped>
.container {
  padding: 1.25rem;
  width: 18.75rem;

  h3 {
    margin: 1.25rem 0 0.625rem;
    color: #333;
  }

  .lark-alert {
    margin-bottom: 0.625rem;
  }
}
</style>
