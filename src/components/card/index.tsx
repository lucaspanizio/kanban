import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import * as S from './styles'

export type Card = {
  id: number
  title: string
}

interface Props extends Card {}

export const Card = ({ id, title }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  return (
    <S.Wrapper
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      tabIndex={0}
      role="button"
      style={{ transform: CSS.Translate.toString(transform), transition, opacity: isDragging ? 0.6 : 1 }}
    >
      {title}
    </S.Wrapper>
  )
}
