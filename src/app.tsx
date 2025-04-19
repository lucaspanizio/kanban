import isPropValid from '@emotion/is-prop-valid'
import { StyleSheetManager } from 'styled-components'

import { GlobalStyle } from './global/styles'
import { useState } from 'react'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { restrictToWindowEdges, snapCenterToCursor } from '@dnd-kit/modifiers'
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { Column } from '@/components/column'

export function App() {
  const [cards, setCards] = useState([
    { id: 1, title: 'Product A' },
    { id: 2, title: 'Product B' },
    { id: 3, title: 'Product C' },
  ])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const getTaskPos = (id: number) => {
    return cards.findIndex((card) => card.id === id)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id === over?.id) return

    if (active && over) {
      setCards((cards) => {
        const originalPos = getTaskPos(Number(active.id))
        const newPos = getTaskPos(Number(over.id))

        return arrayMove(cards, originalPos, newPos)
      })
    }
  }

  return (
    <StyleSheetManager enableVendorPrefixes shouldForwardProp={isPropValid}>
      <GlobalStyle />

      <main>
        <h1>Kanban Board</h1>
        <DndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
          collisionDetection={closestCorners}
          modifiers={[restrictToWindowEdges, snapCenterToCursor]}
        >
          <div className="container">
            <Column id="products" title="Products" cards={cards} />
          </div>
        </DndContext>
      </main>
    </StyleSheetManager>
  )
}
