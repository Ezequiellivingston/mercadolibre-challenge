import React from 'react'
import PropTypes from 'prop-types'

import { routes } from './routes'
import { Routes, Route } from 'react-router-dom'

import Navbar from './layouts/Navbar'
import './styles/main.scss'

function App ({ initialProps }) {
  return (
    <>
      <Navbar />

      <Routes>
        {routes.map(({ path, component: Page }) => (<Route exact key={path} path={path} element={<Page {...initialProps} />} />))}
      </Routes>
    </>
  )
}

App.propTypes = {
  initialProps: PropTypes.object
}

export default App
