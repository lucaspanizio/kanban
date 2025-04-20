import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import * as S from './styles'

export type CardType = {
  id: number
  title: string
}

interface Props extends CardType {}

export const Card = ({ id, title }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  return (
    <S.Wrapper
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.6 : 1,
      }}
    >
      {title}
    </S.Wrapper>
  )
}
