import React from 'react'
import PropTypes from 'prop-types'
import { Routes, Route } from 'react-router-dom'
import { routes } from './routes'

import './styles/main.scss'

function App ({ initialProps }) {
  return (
    <Routes>
      {routes.map(({ path, component: Page }) => (<Route key={path} path={path} element={<Page {...initialProps} />} />))}
    </Routes>
  )
}

App.propTypes = {
  initialProps: PropTypes.object
}

export default App
