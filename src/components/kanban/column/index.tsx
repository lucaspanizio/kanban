import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useDroppable } from '@dnd-kit/core'
import { Card, CardType } from '@/components/kanban/card'
import * as S from './styles'

interface Props {
  id: string
  title: string
  cards: CardType[]
}

export const Column = ({ id, title, cards }: Props) => {
  const { setNodeRef } = useDroppable({ id })

  return (
    <S.Wrapper>
      <S.Title>{title}</S.Title>

      <div ref={setNodeRef}>
        <SortableContext items={cards.map((card) => card.id)} strategy={verticalListSortingStrategy}>
          {cards.map((card) => (
            <Card key={card.id} {...card} />
          ))}
        </SortableContext>
      </div>
    </S.Wrapper>
  )
}
