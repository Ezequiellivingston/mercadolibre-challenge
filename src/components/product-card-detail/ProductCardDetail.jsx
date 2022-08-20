import React from 'react'
import PropTypes from 'prop-types'

import './ProductCardDetail.scss'

function ProductCard ({ item }) {
  const TEXT_CONDITIONS = { new: 'Nuevo' }

  return (
    <div className='product-card-detail'>
      <figure className='product-card-detail__img'>
        <img src={item.picture} alt={item.title} />
      </figure>

      <div className='product-card-detail-header'>
        <div className='product-card-detail-header__subtitle'>
          {TEXT_CONDITIONS[item.condition]} - {item.sold_quantity} vendidos
        </div>

        <h1 className='product-card-detail-header__title'>
          {item.title}
        </h1>

        <div className='product-card-detail-price'>
          <span className='product-card-detail-price__currency'>{item.price.symbol}</span>
          <span className='product-card-detail-price__amount'>{item.price.amount}</span>
        </div>

        <button className='product-card-detail-header__button-buy'>
          Comprar
        </button>
      </div>

      <div className='product-card-detail-description'>
        <h2 className='product-card-detail-description__title'>
          Descripción del producto
        </h2>

        <div className='product-card-detail-description__content'>
          {item.description}
        </div>
      </div>
    </div>
  )
}

ProductCard.propTypes = {
  author: PropTypes.object,
  item: PropTypes.object
}

export default ProductCard
