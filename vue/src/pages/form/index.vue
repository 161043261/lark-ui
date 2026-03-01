<script lang="ts" setup>
import LarkForm from '@/components/form/index.vue'
import LarkFormItem from '@/components/form/item/index.vue'
import LarkButton from '@/components/button/index.vue'
import { reactive, useTemplateRef } from 'vue'
import type { TFormRules } from '@/components/form/types'

interface IFormData {
  email: string
  password: string
}

const formData = reactive<IFormData>({
  email: '161043261@qq.com',
  password: 'forget?',
})

const rules: TFormRules<IFormData> = {
  email: [{ type: 'email', required: true, trigger: 'blur' }],
  password: [
    {
      min: 4,
      max: 8,
      type: 'string',
      required: true,
      trigger: 'blur',
      message: '4 <= password.length <= 8',
    },
  ],
}

const ref = useTemplateRef('lark-form')
</script>

<template>
  <LarkForm ref="lark-form" v-model="formData" :rules="rules" trigger="blur">
    <LarkFormItem label="Email" field="email" v-slot="{ validate }">
      <input v-model="formData.email" @blur="validate" />
    </LarkFormItem>
    <LarkFormItem label="Password" field="password" v-slot="{ validate }">
      <input v-model="formData.password" @blur="validate" />
    </LarkFormItem>
    <div>
      <LarkButton type="primary" @click.prevent="ref?.validates()">Submit</LarkButton>
      <LarkButton type="info" @click.prevent="ref?.resetFields()">Reset</LarkButton>
    </div>
  </LarkForm>
</template>
