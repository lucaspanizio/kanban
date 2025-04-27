import { DragEndEvent, DragOverEvent, UniqueIdentifier } from '@dnd-kit/core'
import { ColumnType } from '.'

export function withValidDrag<T extends DragOverEvent | DragEndEvent>(
  event: T,
  callback: (ids: { activeId: string; overId: UniqueIdentifier }) => void,
) {
  const { active, over } = event
  if (!over || active.id === over.id) return

  callback({ activeId: active.id as string, overId: over.id })
}

export function findColumnIndex(columns: ColumnType[], cardId: number | string) {
  return columns.findIndex((col) => col.cards.some((card) => card.id === cardId))
}

export function getDragMeta(columns: ColumnType[], activeId: string, overId: UniqueIdentifier) {
  const fromColIndex = findColumnIndex(columns, activeId)
  const toColIndex = findColumnIndex(columns, overId)

  return {
    fromColIndex,
    toColIndex,
    isSameColumn: fromColIndex === toColIndex,
  }
}

export function updateColumns(
  columns: ColumnType[],
  fromColIndex: number,
  toColIndex: number,
  activeId: string,
  overId: UniqueIdentifier,
) {
  const newColumns = [...columns]
  const sourceCards = [...newColumns[fromColIndex].cards]
  const destCards = [...newColumns[toColIndex].cards]

  const cardIndex = sourceCards.findIndex((c) => c.id === activeId)
  const [movedCard] = sourceCards.splice(cardIndex, 1)

  const overIndex = destCards.findIndex((c) => c.id === overId)
  const insertAt = overIndex === -1 ? destCards.length : overIndex + 1

  destCards.splice(insertAt, 0, movedCard)

  newColumns[fromColIndex] = { ...newColumns[fromColIndex], cards: sourceCards }
  newColumns[toColIndex] = { ...newColumns[toColIndex], cards: destCards }

  return newColumns
}
