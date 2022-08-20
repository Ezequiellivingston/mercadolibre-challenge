import React from 'react'
import PropTypes from 'prop-types'

import './ProductSearchResult.scss'
import ProductCard from '@/components/product-card/ProductCard'

function ProductSearchResult ({ products }) {
  return (
    <ol className='product-search-result'>
        {products.map(product => (
          <li key={product.id}>
            <ProductCard {...product} />
          </li>
        ))}
    </ol>
  )
}

ProductSearchResult.propTypes = {
  products: PropTypes.array
}

export default ProductSearchResult
