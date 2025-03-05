import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './globals.css'

import { App } from './App.tsx'

import { StepsProvider } from './contexts/steps.tsx'

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StepsProvider>
      <App />
    </StepsProvider>
  </StrictMode>
)
