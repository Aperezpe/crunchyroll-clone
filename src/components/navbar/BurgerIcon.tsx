import React from 'react'
import './BurgerIcon.scss'

interface BurgerIconParams {
  color?: string
}

const BurgerIcon = ({ color }: BurgerIconParams) => {

  if(color) { console.log("TODO") } // Do something with the color

  return (
    <div className='burger-icon'></div>
  )
}

export default BurgerIcon