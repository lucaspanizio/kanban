import styled, { css, CSSProperties } from 'styled-components'

export type MinHeight = CSSProperties['minHeight']
export type Padding = CSSProperties['padding']

interface Props {
  minHeight: MinHeight
  padding: Padding
}

export const Wrapper = styled.div<Props>`
  ${({ minHeight = 'auto', padding = '12px' }) => css`
    display: flex;

    textarea,
    button {
      padding: ${padding};
      min-height: ${minHeight};
    }
  `}
`

export const Input = styled.textarea`
  width: 100%;

  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;

  font-family: inherit;
  font-size: inherit;

  resize: none;
  overflow: hidden;
  white-space: pre-wrap;
  word-break: break-word;
`

export const Button = styled.button`
  display: flex;
  align-items: center;
  flex: 1;

  height: fit-content;
  width: 100%;
  min-width: 300px;
  max-width: 100%;

  border: 1px solid transparent;
  border-radius: 6px;

  cursor: pointer;
  white-space: nowrap;
  background-color: #e6e6f0;
  opacity: 0.65;

  &:hover {
    opacity: 1;
  }
`
