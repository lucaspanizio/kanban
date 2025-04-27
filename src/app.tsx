import isPropValid from '@emotion/is-prop-valid'
import { StyleSheetManager } from 'styled-components'
import { useState } from 'react'

import { ColumnType, Kanban } from '@/components/kanban'
import { Switch } from '@/components/switch'
import { GlobalStyle } from '@/global/styles'

const mockData: ColumnType[] = [
  {
    id: '1',
    title: 'To Do',
    cards: [
      { id: '1', title: 'Definir escopo do projeto' },
      { id: '2', title: 'Pesquisar requisitos de usuário' },
    ],
  },
  {
    id: '2',
    title: 'In Progress',
    cards: [
      { id: '3', title: 'Implementar autenticação' },
      { id: '4', title: 'Criar layout responsivo' },
    ],
  },
  {
    id: '3',
    title: 'Done',
    cards: [
      { id: '5', title: 'Configurar ambiente de desenvolvimento' },
      { id: '6', title: 'Escrever testes unitários iniciais' },
    ],
  },
]

export function App() {
  const [isSortable, setIsSortable] = useState(true)
  const [allowInclusion, setAllowInclusion] = useState(true)
  const [wantInitialData, setWantInitialData] = useState(true)

  return (
    <StyleSheetManager enableVendorPrefixes shouldForwardProp={isPropValid}>
      <GlobalStyle />

      <main>
        <h1>Kanban Board</h1>

        <div className="settings">
          <Switch
            label="Inserir dados de exemplo?"
            isChecked={wantInitialData}
            onChange={() => setWantInitialData((prevState) => !prevState)}
          />
          <Switch
            label="Permite arrastar?"
            isChecked={isSortable}
            onChange={() => setIsSortable((prevState) => !prevState)}
          />
          <Switch
            label="Permite criar novos cartões e colunas?"
            isChecked={allowInclusion}
            onChange={() => setAllowInclusion((prevState) => !prevState)}
          />
        </div>

        <Kanban
          initialData={wantInitialData ? mockData : undefined}
          isSortable={isSortable}
          allowInclusion={allowInclusion}
        />
      </main>
    </StyleSheetManager>
  )
}
