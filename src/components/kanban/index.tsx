import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { restrictToWindowEdges } from '@dnd-kit/modifiers'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useCallback, useEffect, useState } from 'react'

import { Column } from './column'
import { NewColumn } from './new-column'
import { Card, type CardType } from './card'
import { ensurePrefix, getDragMeta, updateColumns, withValidDrag } from './settings'

export type ColumnType = {
  id: string
  title: string
  cards: CardType[]
}

interface KanbanProps {
  initialData?: ColumnType[]
  isSortable?: boolean
  allowInclusion?: boolean
}

export const Kanban = ({ initialData = [], isSortable = true, allowInclusion = true }: KanbanProps) => {
  const [columns, setColumns] = useState<ColumnType[]>(initialData)
  const [activeCard, setActiveCard] = useState<CardType | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const card = columns.flatMap((col) => col.cards).find((card) => card.id === event.active.id) || null
      if (card !== activeCard) {
        setActiveCard(card)
      }
    },
    [columns, activeCard],
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveCard(null)

      withValidDrag(event, ({ activeId, overId }) => {
        const { isSameColumn, toColIndex, fromColIndex } = getDragMeta(columns, activeId, String(overId))

        if (!isSameColumn) {
          setColumns((prev) => updateColumns(prev, fromColIndex, toColIndex, activeId, overId))
          return
        }

        setColumns((prev) =>
          prev.map((col, colIndex) => {
            if (colIndex === toColIndex) {
              const oldIndex = col.cards.findIndex((c) => c.id === activeId)
              const newIndex = col.cards.findIndex((c) => c.id === overId)
              return {
                ...col,
                cards: arrayMove(col.cards, oldIndex, newIndex),
              }
            }
            return col
          }),
        )
      })
    },
    [columns],
  )

  const handleAddColumn = useCallback((title: string) => {
    const newColumn: ColumnType = { id: `column_${Date.now()}-${Math.random()}`, title, cards: [] }
    setColumns((prev) => [...prev, newColumn])
  }, [])

  const handleAddCard = useCallback((colId: string, cardTitle: string) => {
    const newCard: CardType = { id: `card_${Date.now()}-${Math.random()}`, title: cardTitle }

    setColumns((prev) => {
      return prev.map((col) => {
        if (col.id === colId) return { ...col, cards: [...col.cards, newCard] }
        return col
      })
    })
  }, [])

  useEffect(() => {
    if (initialData) {
      // Garante que todos os IDs tenham prefixo column_ ou card_ para facilitar a identificação
      setColumns(ensurePrefix(initialData))
    }
  }, [initialData])

  return (
    <DndContext
      collisionDetection={closestCorners}
      modifiers={[restrictToWindowEdges]}
      {...(isSortable && {
        sensors,
        onDragStart: handleDragStart,
        onDragEnd: handleDragEnd,
      })}
    >
      <div className="container">
        {columns.map((col) => (
          <Column
            key={col.id}
            id={col.id}
            title={col.title}
            cards={col.cards}
            isSortable={isSortable}
            allowInclusion={allowInclusion}
            onAddCard={handleAddCard}
          />
        ))}

        {allowInclusion && <NewColumn numberOfCards={0} onSave={handleAddColumn} />}

        <DragOverlay>
          {activeCard && <Card id={activeCard.id} title={activeCard.title} isSortable={isSortable} />}
        </DragOverlay>
      </div>
    </DndContext>
  )
}
