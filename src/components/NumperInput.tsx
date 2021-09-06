import React, { HTMLProps } from 'react'
import styled from '@emotion/styled'

const Input = styled.input`
  background: none;
  border: none;
  color: var(--text);
  font-size: var(--font-40);
  border-bottom: 4px solid var(--text);
  width: 100%;
  padding-bottom: 1rem;
  -webkit-appearance: none;
  -moz-appearance: textfield;
`
export const NumperInput: React.FC<{} & HTMLProps<HTMLInputElement>> = (props) => {
  return <Input {...props} />
}
