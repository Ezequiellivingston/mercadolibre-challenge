import React from 'react'
import { Routes, Route } from 'react-router-dom'

import './styles/main.scss'

import Home from './pages/Home'
import Detail from './pages/Detail'
import Search from './pages/Search'

function App () {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<Search />} />
        <Route path="/items/:id" element={<Detail />} />
      </Routes>
    </>
  )
}

export default App
