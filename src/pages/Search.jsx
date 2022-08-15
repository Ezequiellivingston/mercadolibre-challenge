import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

function Search ({ results }) {
  return (
    <div>Search: <ul>{ results.map(({ id, title }) => <li key={id}>{title}</li>) } </ul></div>
  )
}

Search.propTypes = {
  results: PropTypes.object
}

Search.getInitialProps = async ({ query }) => {
  const res = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query.q}`).then(res => res.data)
  return { results: res.results }
}

export default Search
