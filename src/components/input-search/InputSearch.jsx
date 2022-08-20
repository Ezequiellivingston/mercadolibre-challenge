import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import './Inputsearch.scss'
import searchIcon from '@/assets/ic_Search.png'
import { useNavigation } from '@/hooks/useNavigation'

function InputSearch () {
  const { push } = useNavigation()

  const query = new URLSearchParams(useLocation().search)
  const [search, setSearch] = useState(query.get('q') || '')

  function handlerSearch (event) {
    event.preventDefault()
    push(`/items?q=${search}`)
  }

  return (
    <form className='input-search' onSubmit={(event) => handlerSearch(event)}>
      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder='Nunca dejes de buscar'
        className="input-search__input"
        name="search"
        autoComplete={'off'}
      />

      <button className='input-search__button'>
        <img
          src={searchIcon}
          alt="icon"
          width="15"
          height="15"
        />
      </button>
    </form>

  )
}

InputSearch.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

export default InputSearch
