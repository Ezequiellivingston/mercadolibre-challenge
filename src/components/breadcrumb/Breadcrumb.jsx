import React from 'react'
import PropTypes from 'prop-types'

import './Breadcrumb.scss'

// TODO: Codigo quemado, no encontre esto deontro de la respuesta de la api
const ITEMS_DEFAULT = [
  { label: 'Electronica, audio y video' },
  { label: 'iPod' },
  { label: 'Reproductores' },
  { label: 'iPod touch' },
  { label: '32 GB' }
]

function Breadcrumb ({ items = ITEMS_DEFAULT }) {
  return (
    <div className='breadcrumb'>
      {items.map((item, index) => (<a key={index} > { item.label } {items.length - 2 < index ? '' : '>'} </a>))}
    </div>
  )
}

Breadcrumb.propTypes = {
  items: PropTypes.array
}

export default Breadcrumb
