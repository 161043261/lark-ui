import LarkButton from '@/components/button'
import LarkToast from '@/components/message/toast'
import LarkToastV2 from '@/components/message/toast/v2'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

function Index() {
  return (
    <Container>
      <div>
        <LarkButton type="success" onClick={() => LarkToast.success('Success')}>
          Success
        </LarkButton>
        <LarkButton type="error" onClick={() => LarkToast.error('Error')}>
          Error
        </LarkButton>
        <LarkButton type="warning" onClick={() => LarkToast.warning('Warning')}>
          Warning
        </LarkButton>
        <LarkButton type="info" onClick={() => LarkToast.info('Info')}>
          Info
        </LarkButton>
        <LarkButton type="success" plain onClick={() => LarkToast.closeAll()}>
          Close All
        </LarkButton>
      </div>

      <div>
        <LarkButton type="success" onClick={() => LarkToastV2.success('Success')}>
          Success
        </LarkButton>
        <LarkButton type="error" onClick={() => LarkToastV2.error('Error')}>
          Error
        </LarkButton>
        <LarkButton type="warning" onClick={() => LarkToastV2.warning('Warning')}>
          Warning
        </LarkButton>
        <LarkButton type="info" onClick={() => LarkToastV2.info('Info')}>
          Info
        </LarkButton>
        <LarkButton type="success" plain onClick={() => LarkToastV2.closeAll()}>
          Close All
        </LarkButton>
      </div>
    </Container>
  )
}

export default Index
