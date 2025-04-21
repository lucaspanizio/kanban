import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { Card, CardType } from '@/components/kanban/card'
import { NewCard } from '@/components/kanban/new-card'

import * as S from './styles'

interface Props {
  id: string
  title: string
  cards: CardType[]
  isSortable: boolean
  allowInclusion: boolean
  onAddCard: (colId: string, title: string) => void
}

export const Column = ({ id, title, cards, isSortable, allowInclusion, onAddCard }: Props) => {
  const { setNodeRef } = useDroppable({ id })

  return (
    <S.Wrapper>
      <S.Title>{title}</S.Title>

      <div ref={setNodeRef}>
        {isSortable ? (
          <SortableContext items={cards.map((card) => card.id)} strategy={verticalListSortingStrategy}>
            {cards.map((card) => (
              <Card key={card.id} {...card} isSortable />
            ))}
          </SortableContext>
        ) : (
          cards.map((card) => <Card key={card.id} {...card} isSortable={false} />)
        )}
      </div>

      {allowInclusion && (
        <NewCard
          numberOfCards={cards.length}
          onSave={(title) => onAddCard(id, title)}
          minHeight={isSortable ? '40px' : undefined}
          padding={isSortable ? '16px' : '12px'}
        />
      )}
    </S.Wrapper>
  )
}
