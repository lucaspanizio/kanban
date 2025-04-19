import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useDroppable } from '@dnd-kit/core'
import { Card } from '@/components/card'
import * as S from './styles'

interface Props {
  id: string
  title: string
  cards: Card[]
}

export const Column = ({ id, title, cards }: Props) => {
  const { setNodeRef } = useDroppable({ id })

  return (
    <S.Wrapper ref={setNodeRef}>
      <S.Title>{title}</S.Title>

      <SortableContext items={cards} strategy={verticalListSortingStrategy}>
        {cards.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </SortableContext>
    </S.Wrapper>
  )
}
