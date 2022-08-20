import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import Breadcrumb from '../components/breadcrumb/Breadcrumb'
import ProductCardDetail from '../components/product-card-detail/ProductCardDetail'

function Detail ({ item, author }) {
  return (
    <div className='row container p-bottom-lg'>
      <div className='col-10 col-offset-1'>
        <Breadcrumb />

        <ProductCardDetail author={author} item={item} />
      </div>
    </div>
  )
}

Detail.propTypes = {
  author: PropTypes.object,
  item: PropTypes.object
}

Detail.getInitialProps = async ({ params }) => {
  const data = await Promise.allSettled([
    axios.get(`https://api.mercadolibre.com/${params[0]}`).then(res => res.data),
    axios.get(`https://api.mercadolibre.com/${params[0]}/description`).then(res => res.data)
  ])
    .then(res => res.map(r => r.value))
    .then(([product, description]) => {
      return {
        author: {
          name: '',
          lastname: ''
        },
        item: {
          id: product.id,
          title: product.title,
          price: {
            symbol: '$',
            currency: product.currency_id,
            amount: product.price,
            decimals: 2
          },
          picture: product.pictures[0]?.url,
          condition: product.condition,
          free_shipping: product.shipping.free_shipping,
          sold_quantity: product.sold_quantity,
          description: description.plain_text
        }
      }
    })

  const currency = await axios.get(`https://api.mercadolibre.com/currencies/${data.item.price.currency}`).then(res => res.data)

  data.item.price.symbol = currency.symbol
  data.item.price.decimals = currency.decimal_places

  return data
}

export default Detail
