import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

hydrateRoot(
  document.getElementById('root'),
  <BrowserRouter>
    <App initialProps={window.__INITIAL_PROPS__} />
  </BrowserRouter>
)

delete window.__INITIAL_PROPS__
