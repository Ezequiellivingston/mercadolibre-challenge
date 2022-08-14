import fs from 'fs'
import path from 'path'
import express from 'express'

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'

import App from './App'

const app = express()
const template = fs.readFileSync(path.resolve(__filename, '../public/index.html'), 'utf-8')

app.use(express.static(path.resolve(__dirname)))

app.get('*', (req, res) => {
  const content = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  )
  res.send(template.replace('<div id="root"></div>', `<div id="root">${content}</div>`))
})

app.listen(8080, () => console.log('Server runinng in port 8080'))
