import { styled, css } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`

export const Switch = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;

  border: 12px;
  background-color: #fff;
  border: 1px solid #ccc;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-sizing: border-box;

  width: 40px;
  height: 22px;
  border-radius: 12px;
`

export const Ball = styled.div<{
  checked: boolean
}>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
  border-radius: 50%;
  transition: left 0.2s ease;
  pointer-events: none;

  ${({ checked }) => {
    return css`
      width: 16px;
      height: 16px;
      background-color: #ccc;
      left: ${checked ? css`calc(100% - 16px - 2.5px)` : '2.5px'};
    `
  }}
`
