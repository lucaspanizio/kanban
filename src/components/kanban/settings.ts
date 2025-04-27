import { DragEndEvent, DragOverEvent, UniqueIdentifier } from '@dnd-kit/core'
import { ColumnType } from '.'

export function withValidDrag<T extends DragOverEvent | DragEndEvent>(
  event: T,
  callback: (ids: { activeId: string; overId: UniqueIdentifier }) => void,
) {
  const { active, over } = event
  // Nenhum elemento válido sobreposto ou o elemento ativo é o mesmo que o sobreposto
  if (!over || active.id === over.id) return
  callback({ activeId: active.id as string, overId: over.id })
}

export function getDragMeta(columns: ColumnType[], activeId: string, overId: string) {
  const findColumnIndex = (id: string) => {
    if (id.startsWith('column_')) return columns.findIndex((col) => col.id === id)
    return columns.findIndex((col) => col.cards.some((card) => card.id === id))
  }

  const fromColIndex = findColumnIndex(activeId)
  const toColIndex = findColumnIndex(overId)

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

export const ensurePrefix = (data: ColumnType[]): ColumnType[] => {
  return data.map((column) => ({
    id: `column_${column.id}`,
    title: column.title,
    cards: column.cards.map((card) => ({
      ...card,
      id: `card_${card.id}`,
    })),
  }))
}
