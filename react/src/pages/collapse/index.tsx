import { useState } from 'react'
import type { TName } from '@/components/collapse/types'
import LarkCollapse from '@/components/collapse'
import LarkCollapseItem from '@/components/collapse/item'
import styled from 'styled-components'

const Container = styled.div`
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
`

export default function Index() {
  const [basicActive, setBasicActive] = useState<TName[]>(['1'])
  const [accordionActive, setAccordionActive] = useState<TName[]>(['a'])
  const [disabledActive, setDisabledActive] = useState<TName[]>(['x'])

  const handleChange = (names: TName[]) => {
    console.log('[collapse change]', names)
  }

  return (
    <Container>
      <h3>Basic Usage (Controlled)</h3>
      <div className="meta">Active panels: {JSON.stringify(basicActive)}</div>
      <LarkCollapse
        activeNames={basicActive}
        onChange={(v) => {
          setBasicActive(v)
          handleChange(v)
        }}
      >
        <LarkCollapseItem name="1" title="Panel 1">
          <div className="content">
            <p>This is the content area.</p>
            <p>You can place any content here, such as forms, buttons, or tips.</p>
          </div>
        </LarkCollapseItem>
        <LarkCollapseItem name="2" title="Panel 2">
          <div className="content">
            <p>Supports multi-line text.</p>
            <p>Also supports any components within the slot.</p>
          </div>
        </LarkCollapseItem>
        <LarkCollapseItem name="3" title="Panel 3">
          <div className="content">
            <p>Content of the third panel.</p>
          </div>
        </LarkCollapseItem>
      </LarkCollapse>

      <h3>Accordion Mode (Single Expand)</h3>
      <div className="meta">Active panels: {JSON.stringify(accordionActive)}</div>
      <LarkCollapse
        activeNames={accordionActive}
        accordion
        onChange={(v) => {
          setAccordionActive(v)
          handleChange(v)
        }}
      >
        <LarkCollapseItem name="a" title="Accordion A">
          <div className="content">
            <p>In accordion mode, only one panel can be expanded at a time.</p>
          </div>
        </LarkCollapseItem>
        <LarkCollapseItem name="b" title="Accordion B">
          <div className="content">
            <p>Click to toggle the active panel.</p>
          </div>
        </LarkCollapseItem>
        <LarkCollapseItem name="c" title="Accordion C">
          <div className="content">
            <p>Content of the third panel.</p>
          </div>
        </LarkCollapseItem>
      </LarkCollapse>

      <h3>Disabled Items</h3>
      <div className="meta">Active panels: {JSON.stringify(disabledActive)}</div>
      <LarkCollapse
        activeNames={disabledActive}
        onChange={(v) => {
          setDisabledActive(v)
          handleChange(v)
        }}
      >
        <LarkCollapseItem name="x" title="Expandable Item">
          <div className="content">
            <p>This item can be expanded and collapsed normally.</p>
          </div>
        </LarkCollapseItem>
        <LarkCollapseItem name="y" title="Disabled Item (Click Ignored)" disabled>
          <div className="content">
            <p>This item is disabled. Clicking the header will not toggle it.</p>
          </div>
        </LarkCollapseItem>
      </LarkCollapse>
    </Container>
  )
}
