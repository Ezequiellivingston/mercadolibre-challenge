import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import ProductSearchResult from '@/containers/product-search-result/ProductSearchResult'
import Breadcrumb from '../components/breadcrumb/Breadcrumb'

function Search ({ query }) {
  return (
    <div className='row container'>
      <div className='col-10 col-offset-1'>
        <Breadcrumb />

        <ProductSearchResult products={ query.results } />
      </div>
    </div>
  )
}

Search.propTypes = {
  query: PropTypes.object
}

Search.getInitialProps = async ({ query }) => {
  const response = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query.q}&limit=4`).then(res => res.data)
  return { query: response }
}

export default Search
