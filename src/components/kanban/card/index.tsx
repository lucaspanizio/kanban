import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import * as S from './styles'

export type CardType = {
  id: string
  title: string
}

interface Props extends CardType {
  isSortable?: boolean
}

export const Card = ({ id, title, isSortable = false }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  return (
    <S.Wrapper
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.6 : 1,
        ...(isSortable && { padding: '8px 10px 8px 16px' }),
      }}
    >
      <S.Content>
        <S.Title>{title}</S.Title>
        {isSortable && <S.DragHandle {...listeners} {...attributes} />}
      </S.Content>
    </S.Wrapper>
  )
}
