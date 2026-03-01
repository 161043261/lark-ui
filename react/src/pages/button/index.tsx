import LarkButton from '@/components/button'
import styled from 'styled-components'

const Container = styled.div`
  padding: 1.25rem;

  h3 {
    margin: 1.25rem 0.625rem;
    color: #333;
  }

  .container-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.625rem;
    align-items: center;
  }
`

function Index() {
  return (
    <Container>
      <h3>Button Types</h3>
      <div className="container-row">
        <LarkButton type="primary">Primary</LarkButton>
        <LarkButton type="success">Success</LarkButton>
        <LarkButton type="info">Info</LarkButton>
        <LarkButton type="warning">Warning</LarkButton>
        <LarkButton type="error">Error</LarkButton>
      </div>

      <h3>Plain Buttons</h3>
      <div className="container-row">
        <LarkButton type="primary" plain>
          Primary
        </LarkButton>
        <LarkButton type="success" plain>
          Success
        </LarkButton>
        <LarkButton type="info" plain>
          Info
        </LarkButton>
        <LarkButton type="warning" plain>
          Warning
        </LarkButton>
        <LarkButton type="error" plain>
          Error
        </LarkButton>
      </div>

      <h3>Round Buttons</h3>
      <div className="container-row">
        <LarkButton type="primary" round>
          Primary
        </LarkButton>
        <LarkButton type="success" round>
          Success
        </LarkButton>
        <LarkButton type="info" round>
          Info
        </LarkButton>
        <LarkButton type="warning" round>
          Warning
        </LarkButton>
        <LarkButton type="error" round>
          Error
        </LarkButton>
      </div>

      <h3>Circle Buttons</h3>
      <div className="container-row">
        <LarkButton type="primary" circle icon="edit" />
        <LarkButton type="success" circle icon="check" />
        <LarkButton type="info" circle icon="message" />
        <LarkButton type="warning" circle icon="star" />
        <LarkButton type="error" circle icon="remove" />
      </div>

      <h3>Button Sizes</h3>
      <div className="container-row">
        <LarkButton type="primary" size="large">
          Large
        </LarkButton>
        <LarkButton type="primary" size="medium">
          Medium
        </LarkButton>
        <LarkButton type="primary" size="small">
          Small
        </LarkButton>
      </div>

      <h3>Disabled State</h3>
      <div className="container-row">
        <LarkButton type="primary" disabled>
          Disabled
        </LarkButton>
        <LarkButton type="success" disabled>
          Disabled
        </LarkButton>
      </div>

      <h3>Loading State</h3>
      <div className="container-row">
        <LarkButton type="primary" loading>
          Loading
        </LarkButton>
        <LarkButton type="success" loading>
          Loading
        </LarkButton>
      </div>

      <h3>With Icons</h3>
      <div className="container-row">
        <LarkButton type="primary" icon="edit">
          Edit
        </LarkButton>
        <LarkButton type="success" icon="check">
          Check
        </LarkButton>
        <LarkButton type="error" icon="remove">
          Delete
        </LarkButton>
      </div>
    </Container>
  )
}

export default Index
