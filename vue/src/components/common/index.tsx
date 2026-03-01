import { defineComponent, type Component, type RenderFunction, type VNode } from 'vue'

interface IProps {
  element: string | VNode
}

const LarkComponent: Component<IProps> = defineComponent<IProps>(
  (props: IProps /** , ctx */) => {
    const { element } = props
    const vNode: VNode = (
      // Support JSX Fragment
      <>{element}</>
    )
    const renderFunc: RenderFunction = () => vNode
    return renderFunc
  },
  {
    props: ['element'],
  },
)

export default LarkComponent
