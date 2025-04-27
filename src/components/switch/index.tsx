import { KeyboardEvent } from 'react'

import * as S from './styles'

interface Props {
  label: string
  isChecked: boolean
  onChange: () => void
}

export const Switch = ({ label, isChecked, onChange }: Props) => {
  function handleClick() {
    onChange()
  }

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <S.Wrapper>
      <S.Switch role="checkbox" tabIndex={0} aria-checked={isChecked} onClick={handleClick} onKeyDown={handleKeyDown}>
        <S.Ball checked={isChecked} />
      </S.Switch>
      <span>{label}</span>
    </S.Wrapper>
  )
}
