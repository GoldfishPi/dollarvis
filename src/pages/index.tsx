import * as React from 'react'
import Page from '../components/Page'
import styled from '@emotion/styled'
import { NumperInput } from '../components/NumperInput'
import { Sparkline } from '../components/Sparkline'

const Layout = styled.div`
  padding: 2rem;
  display: grid;
  gap: 4rem;
  flex-grow: 1;
  align-items: center;
  @media screen and (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
    padding: 4rem;
  }
`
const InputGroup = styled.div`
  display: flex;
  gap: 2rem;
`

const InputHalf = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  @media screen and (min-width: 1400px) {
    gap: 12rem;
  }
`

const calculateCompoundInterest = (p: number, interestRate: number, time: number) => Math.round(p * (1 + interestRate) ** time)
const IndexPage = () => {
  const [age, setAge] = React.useState<number>()
  const [principal, setPrincipal] = React.useState<number>()
  const [end] = React.useState(60)
  const [interestRate] = React.useState(0.07)

  const total = React.useMemo(() => {
    if (!principal || !age) return 0
    return calculateCompoundInterest(principal, interestRate, end - age)
  }, [age, principal, end, interestRate])

  const trend = [
    ...new Array(age > end ? 0 : end - (age || 0)).fill([0, 0]).map((_, i) => {
      return [i + age, calculateCompoundInterest(principal, interestRate, i)]
    }),
    [end, total]
  ]
  return (
    <Page>
      <Layout>
        <InputHalf>
          <h1>How much does your money cost?</h1>
          <p>
            As we get older compound interest gets less time to take effect. Use this tool to determine how much your money really costs!
          </p>
          <InputGroup>
            <NumperInput placeholder="Spend" type="number" onChange={(e) => setPrincipal(e.target.value)} />
            <NumperInput placeholder="Age" type="number" onChange={(e) => setAge(parseInt(e.target.value, 10))} />
          </InputGroup>
        </InputHalf>
        <InputHalf>
          <h2>$ {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(total)}</h2>
          <Sparkline width={500} height={350} data={trend} />
        </InputHalf>
      </Layout>
    </Page>
  )
}

export default IndexPage
