import { useRef, useState } from 'react'

import type { MinHeight, Padding } from './styles'
import * as S from './styles'

interface Props {
  numberOfCards: number
  onSave: (title: string) => void
  minHeight?: MinHeight
  padding?: Padding
}

export const NewCard = ({ numberOfCards, onSave, padding, minHeight }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [title, setTitle] = useState('')

  const [isAdding, setIsAdding] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value)

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  const handleAddClick = () => {
    setIsAdding(true)
  }

  const handleSave = () => {
    const trimmed = title.trim()
    if (trimmed) {
      onSave(trimmed)
    }
    setTitle('')
    setIsAdding(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') handleSave()
    if (e.key === 'Escape') {
      setTitle('')
      setIsAdding(false)
    }
  }

  return (
    <S.Wrapper padding={padding} minHeight={minHeight}>
      {isAdding ? (
        <S.Input
          ref={textareaRef}
          rows={1}
          autoFocus
          value={title}
          onBlur={handleSave}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Título do cartão"
        />
      ) : (
        <S.Button onClick={handleAddClick}>
          {numberOfCards > 0 ? '+ Adicionar novo cartão' : '+ Adicionar cartão'}
        </S.Button>
      )}
    </S.Wrapper>
  )
}
