import LarkButton from '@/components/button'
import LarkForm from '@/components/form'
import LarkFormItem from '@/components/form/item'
import {
  type TFormRules,
  type TFormExpose,
  FormItemContext,
  FormContext,
} from '@/components/form/types'
import { useContext, useRef, useState, type ChangeEvent, type MouseEvent } from 'react'

interface IFormData {
  email: string
  password: string
}

function Input(props: { field: keyof IFormData }) {
  const { field } = props
  const { validate } = useContext(FormItemContext)
  const { formData, setFormData } = useContext(FormContext)
  const [value, setValue] = useState<string>(String(formData[field]))
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
  }
  return <input value={value} onBlur={validate} onChange={handleChange} />
}

export default function Index() {
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

  const ref = useRef<TFormExpose | null>(null)

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    ref.current?.validates()
  }

  const handleReset = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    ref.current?.resetFields()
  }

  return (
    <LarkForm
      ref={ref}
      initialValue={{
        email: '161043261@qq.com',
        password: 'forget?',
      }}
      trigger="blur"
      rules={rules}
    >
      <LarkFormItem label="Email" field="email">
        <Input field="email" />
      </LarkFormItem>
      <LarkFormItem label="Password" field="password">
        <Input field="password" />
      </LarkFormItem>

      <div>
        <LarkButton type="primary" onClick={handleSubmit}>
          Submit
        </LarkButton>
        <LarkButton type="info" onClick={handleReset}>
          Reset
        </LarkButton>
      </div>
    </LarkForm>
  )
}
