import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;

  min-width: 300px;

  margin-bottom: 8px;
  padding: 12px;

  border-radius: 4px;
  border: 1px solid #ccc;

  background-color: #fafafa;

  user-select: none;
`
export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export const Title = styled.h3`
  flex: 1;
  margin: 0;
  font-size: inherit;
  font-weight: inherit;
  margin-right: 5px;

  word-break: break-word;
  overflow-wrap: break-word;
  white-space: normal;
`

export const DragHandle = styled.div`
  cursor: grab;
  padding: 6px;

  &::after {
    content: '⋮⋮';
    font-size: 16px;
    font-family: inherit;
    color: #666666;
    font-weight: 600;
  }
`
