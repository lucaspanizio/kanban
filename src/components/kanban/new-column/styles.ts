import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: 16px;
  min-width: 400px;
  height: min-content;
  border-radius: 8px;
  border: 1px solid #dedede;
  background-color: #f7f7fb;
`

export const Input = styled.input`
  border: none;
  outline: none;
  background-color: transparent;

  font-family: inherit;
  font-weight: 700;
  font-size: 1.175rem;
  margin-bottom: 17px;

  width: 100%;

  &::placeholder {
    font-weight: 500;
    font-size: 1rem;
  }
`

export const Button = styled.button`
  display: flex;
  flex: 1;

  height: fit-content;
  white-space: nowrap;

  padding: 12px;
  width: 100%;

  border: none;
  border-radius: 6px;

  cursor: pointer;
  background-color: #e6e6f0;
  opacity: 0.65;

  &:hover {
    opacity: 1;
  }
`
