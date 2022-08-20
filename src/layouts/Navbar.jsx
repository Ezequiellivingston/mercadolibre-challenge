import React from 'react'

import Logo from '@/components/logo/Logo'
import InputSearch from '@/components/input-search/InputSearch'

export default function Navbar () {
  return (
    <nav className='flex items-center bg-brand height-navbar'>
        <div className='row container'>
          <div className="col-10 col-offset-1 flex gap-lg">
            <Logo />

            <InputSearch />
          </div>
        </div>
    </nav>
  )
}
