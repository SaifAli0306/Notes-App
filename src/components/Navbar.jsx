import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-row  bg-[#150144] fixed top-0 h-9 left-0 w-full z-50  justify-center gap-10 text-xl p-1'>
        <NavLink 
        to="/"
        > Home </NavLink>

        <NavLink
        to= "/pastes"
        >Notes</NavLink>
    </div>
  )
}

export default Navbar