import { useCallback, useState } from 'react'
import { restrictToWindowEdges } from '@dnd-kit/modifiers'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { Column } from './column'
import { Card, type CardType } from './card'

export type Columns = Record<string, CardType[]>

interface KanbanProps {
  initialData?: Columns
}

export const Kanban = ({ initialData }: KanbanProps) => {
  // TODO: apresentar uma coluna default quando initialData não for passado
  const [columns, setColumns] = useState<Columns>(initialData ?? {})
  const [activeId, setActiveId] = useState<number | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as number)
  }, [])

  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      withValidDrag(event, ({ activeId, overId }) => {
        const { fromColId, toColId, isSameColumn } = getDragMeta(columns, activeId, overId)

        if (!isSameColumn) {
          setColumns((prev) => ({
            ...prev,
            ...updateColumns(prev, fromColId, toColId, activeId, overId),
          }))
        }
      })
    },
    [columns],
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveId(null)

      withValidDrag(event, ({ activeId, overId }) => {
        const { toColId, isSameColumn } = getDragMeta(columns, activeId, overId)

        if (isSameColumn) {
          setColumns((prev) => {
            const items = [...prev[toColId]]
            const oldIndex = items.findIndex((c) => c.id === activeId)
            const newIndex = items.findIndex((c) => c.id === overId)

            return {
              ...prev,
              [toColId]: arrayMove(items, oldIndex, newIndex),
            }
          })
        }
      })
    },
    [columns],
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      modifiers={[restrictToWindowEdges]}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="container">
        {Object.keys(columns).map((colId) => (
          <Column key={colId} id={colId} title={colId.toUpperCase()} cards={columns[colId]} />
        ))}

        <DragOverlay>
          {activeId !== null &&
            (() => {
              const col = findColumnId(columns, activeId)!
              const card = columns[col].find((c) => c.id === activeId)!
              return <Card id={card.id} title={card.title} />
            })()}
        </DragOverlay>
      </div>
    </DndContext>
  )
}

function withValidDrag<T extends DragOverEvent | DragEndEvent>(
  event: T,
  callback: (ids: { activeId: number; overId: UniqueIdentifier }) => void,
) {
  const { active, over } = event
  if (!over || active.id === over.id) return

  callback({ activeId: active.id as number, overId: over.id })
}

function getDragMeta(columns: Columns, activeId: number, overId: UniqueIdentifier) {
  const fromColId = findColumnId(columns, activeId)!
  const toColId = findColumnId(columns, overId)!

  return { fromColId, toColId, isSameColumn: fromColId === toColId }
}

function updateColumns(columns: Columns, fromCol: string, toCol: string, activeId: number, overId: number | string) {
  const sourceItems = [...columns[fromCol]]
  const destItems = Array.isArray(columns[toCol]) ? [...columns[toCol]] : []

  // Remove o card da coluna origem
  const idx = sourceItems.findIndex((c) => c.id === activeId)
  const [moved] = sourceItems.splice(idx, 1)

  // Determina a posição do card na coluna destino
  const overIndex = destItems.findIndex((c) => c.id === overId)
  const insertAt = overIndex === -1 ? destItems.length : overIndex + 1

  destItems.splice(insertAt, 0, moved)

  return {
    [fromCol]: sourceItems,
    [toCol]: destItems,
  }
}

export function findColumnId(columns: Columns, id: number | string): string | undefined {
  if (typeof id === 'string' && Object.keys(columns).includes(id)) return id
  return Object.keys(columns).find((colId) => columns[colId].some((card) => card.id === id))
}
