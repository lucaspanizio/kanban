import styled from 'styled-components'

export const Wrapper = styled.div`
  background-color: #fafafa;
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  cursor: grab;

  &:focus {
    outline: 2px solid oklch(74.6% 0.16 232.661);
  }
`
