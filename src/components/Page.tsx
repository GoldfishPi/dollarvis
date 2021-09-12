import React from 'react'
import styled from '@emotion/styled'

const Background = styled.div`
  background: var(--background);
  width: 100vw;
  height: 100vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
`
const Page: React.FC<{}> = ({ children }) => {
  return <Background>{children}</Background>
}
export default Page
