import * as React from 'react'
import Page from '../components/Page'
import styled from '@emotion/styled'
import { NumperInput } from '../components/NumperInput'
import { Sparkline } from '../components/Sparkline'

const Layout = styled.div`
  padding: 4rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
`
const InputGroup = styled.div`
  display: flex;
  gap: 2rem;
`

const InputHalf = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12rem;
`
const IndexPage = () => (
  <Page>
    <Layout>
      <InputHalf>
        <h1>How Much does your money cost?</h1>
        <p>As we get older compound interest get’s less time to take effect. Use this tool to determine how much your money really costs</p>
        <InputGroup>
          <NumperInput placeholder="Spend" type="number" />
          <NumperInput placeholder="Age" type="number" />
        </InputGroup>
      </InputHalf>
      <InputHalf>
        <h2>$108.89</h2>
        <Sparkline width={500} height={385} />
      </InputHalf>
    </Layout>
  </Page>
)

export default IndexPage
