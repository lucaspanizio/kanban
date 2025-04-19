import isPropValid from '@emotion/is-prop-valid'
import { StyleSheetManager } from 'styled-components'

import { GlobalStyle } from './global/styles'

export function App() {
  return (
    <>
      <StyleSheetManager enableVendorPrefixes shouldForwardProp={isPropValid}>
        <GlobalStyle />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <h1>Kanban Board</h1>
        </div>
      </StyleSheetManager>
    </>
  )
}
