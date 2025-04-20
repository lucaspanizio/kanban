import isPropValid from '@emotion/is-prop-valid'
import { StyleSheetManager } from 'styled-components'
import { Kanban } from '@/components/kanban'
import { GlobalStyle } from '@/global/styles'

const mockData = {
  todo: [
    { id: 1, title: 'Definir escopo do projeto' },
    { id: 2, title: 'Pesquisar requisitos de usuário' },
  ],
  'in progress': [
    { id: 3, title: 'Implementar autenticação' },
    { id: 4, title: 'Criar layout responsivo' },
  ],
  done: [
    { id: 5, title: 'Configurar ambiente de desenvolvimento' },
    { id: 6, title: 'Escrever testes unitários iniciais' },
  ],
}

export function App() {
  return (
    <StyleSheetManager enableVendorPrefixes shouldForwardProp={isPropValid}>
      <GlobalStyle />

      <main>
        <h1>Kanban Board</h1>
        <Kanban initialData={mockData} />
      </main>
    </StyleSheetManager>
  )
}
