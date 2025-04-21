import { useState } from 'react'

import * as S from './styles'

interface Props {
  numberOfCards: number
  onSave: (title: string) => void
}

export const NewColumn = ({ numberOfCards, onSave }: Props) => {
  const [isAdding, setIsAdding] = useState(false)
  const [title, setTitle] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleAddClick = () => {
    setIsAdding(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSave()
    if (e.key === 'Escape') {
      setTitle('')
      setIsAdding(false)
    }
  }

  const handleSave = () => {
    const trimmed = title.trim()
    if (trimmed) {
      onSave(trimmed)
    }
    setTitle('')
    setIsAdding(false)
  }

  return (
    <S.Wrapper>
      {isAdding ? (
        <S.Input
          autoFocus
          type="text"
          value={title}
          onBlur={handleSave}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Título da coluna"
        />
      ) : (
        <S.Button onClick={handleAddClick}>
          {numberOfCards > 0 ? '+ Adicionar nova coluna' : '+ Adicionar coluna'}
        </S.Button>
      )}
    </S.Wrapper>
  )
}
