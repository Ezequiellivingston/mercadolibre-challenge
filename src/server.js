import fs from 'fs'
import path from 'path'
import express from 'express'

import App from './App'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { matchPath } from 'react-router-dom'
import { StaticRouter } from 'react-router-dom/server'
import { routes } from './routes'

const port = process.env.PORT || 8080
const app = express()
const template = fs.readFileSync(path.resolve(__filename, '../public/index.html'), 'utf-8')
const defaultGetInitialProps = () => Promise.resolve({})

app.use(express.static(path.resolve(__dirname)))

app.get('*', (req, res) => {
  const { query, params, path, url } = req
  const route = routes.find((route) => matchPath(route.path, path))
  const getInitialProps = route?.component?.getInitialProps || defaultGetInitialProps

  getInitialProps({ query, params, path, url }).then((initialProps) => {
    const content = ReactDOMServer.renderToString(
      <StaticRouter location={url} >
        <App initialProps={initialProps} />
      </StaticRouter>
    )

    res.send(
      template
        .replace('__APP__', content)
        .replace('__TITLE__', 'Mercado Libre Challenge')
        .replace('__INITIAL_PROPS__', `window.__INITIAL_PROPS__ = ${JSON.stringify(initialProps)}`)
    )
  })
})

app.listen(port, () => console.log(`Server runinng in port ${port}`))
