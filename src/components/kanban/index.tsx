import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverEvent,
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
import { findColumnIndex, getDragMeta, updateColumns, withValidDrag } from './settings'

export type ColumnType = {
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
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }, [])

  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      withValidDrag(event, ({ activeId, overId }) => {
        const { fromColIndex, toColIndex, isSameColumn } = getDragMeta(columns, activeId, overId)

        if (!isSameColumn) {
          setColumns((prev) => updateColumns(prev, fromColIndex, toColIndex, activeId, overId))
        }
      })
    },
    [columns],
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveId(null)

      withValidDrag(event, ({ activeId, overId }) => {
        const { toColIndex, isSameColumn } = getDragMeta(columns, activeId, overId)

        if (isSameColumn) {
          setColumns((prev) => {
            const newColumns = [...prev]
            const cards = [...newColumns[toColIndex].cards]
            const oldIndex = cards.findIndex((c) => c.id === activeId)
            const newIndex = cards.findIndex((c) => c.id === overId)

            newColumns[toColIndex] = {
              ...newColumns[toColIndex],
              cards: arrayMove(cards, oldIndex, newIndex),
            }

            return newColumns
          })
        }
      })
    },
    [columns],
  )

  const handleAddColumn = useCallback((title: string) => {
    setColumns((prev) => [...prev, { title, cards: [] }])
  }, [])

  const handleAddCard = useCallback((colTitle: string, title: string) => {
    const newCard: CardType = { id: `${Date.now()}-${Math.random()}`, title }
    setColumns((prev) => prev.map((col) => (col.title === colTitle ? { ...col, cards: [...col.cards, newCard] } : col)))
  }, [])

  useEffect(() => {
    if (initialData) {
      setColumns(initialData)
    }
  }, [initialData])

  return (
    <DndContext
      collisionDetection={closestCorners}
      modifiers={[restrictToWindowEdges]}
      {...(isSortable && {
        sensors,
        onDragStart: handleDragStart,
        onDragOver: handleDragOver,
        onDragEnd: handleDragEnd,
      })}
    >
      <div className="container">
        {columns.map((col) => (
          <Column
            key={col.title}
            id={col.title}
            title={col.title}
            cards={col.cards}
            isSortable={isSortable}
            allowInclusion={allowInclusion}
            onAddCard={handleAddCard}
          />
        ))}

        {allowInclusion && <NewColumn numberOfCards={0} onSave={handleAddColumn} />}

        <DragOverlay>
          {activeId !== null &&
            (() => {
              const colIndex = findColumnIndex(columns, activeId)
              if (colIndex === -1) return null
              const card = columns[colIndex].cards.find((c) => c.id === activeId)
              if (!card) return null
              return <Card id={card.id} title={card.title} isSortable={isSortable} />
            })()}
        </DragOverlay>
      </div>
    </DndContext>
  )
}
