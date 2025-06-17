import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryProvider } from "./providers/QueryProvider";
import './index.css'
import { AppRouter } from './AppRouter';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <AppRouter />
    </QueryProvider>
  </StrictMode>,
)
