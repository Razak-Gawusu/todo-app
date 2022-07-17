import React from 'react'
import dark from '../assests/images/icon-moon.svg'
import light from '../assests/images/icon-sun.svg'

function Header({darkMode, toggleDarkMode}) {
  return (
      <div className='header--wrapper'>
        <div className='header container'>
        <h1>TODO</h1>
        <img src={!darkMode ? dark: light} alt='dark Mode' onClick={toggleDarkMode}/>
    </div>
      </div>
  )
}

export default Header