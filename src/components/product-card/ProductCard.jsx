import React from 'react'
import PropTypes from 'prop-types'

import './ProductCard.scss'

function ProductCard ({ id, thumbnail, title, price, address }) {
  return (
    <div className='product-card-wrapper'>
      <div className='product-card'>
        <a href={`/items/${id}`}>
          <img className='product-card__img ' src={thumbnail} height="180" width="180" />
        </a>

        <div className='product-card__body' >
          <div className='product-card__price'>
            <span className='m-right-sm'>$</span>
            <span>{price}</span>
          </div>

          <a className='product-card__title' href={`/items/${id}`}>
            <h2>{title}</h2>
          </a>
        </div>

        <div className='product-card__state'>{address.state_name}</div>
      </div>
    </div>
  )
}

ProductCard.propTypes = {
  id: PropTypes.string,
  thumbnail: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
  address: PropTypes.object
}

export default ProductCard
