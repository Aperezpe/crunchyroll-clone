import CrunchyLogo from '../../assets/crunchy-roll-logo.svg?react'
import MenuIcon from '../../assets/menu-icon.svg?react'
import CrownIcon from '../../assets/crown-icon.svg?react'
import SearchIcon from '../../assets/search-icon.svg?react'
import ChevronIcon from '../../assets/down-chevron.svg?react'
import ProfileImage from '../profile-image/ProfileImage'

const Navbar = () => {
  return (
    <nav className='fixed w-full h-15 bg-red-500 bg-tertiary-color flex items-stretch z-50'>
      <a href='#' className='w-15 w- flex items-center justify-center'><MenuIcon fill='var(--secondary-color)' height="24px"/></a>
      <a href='#' className='w-15 flex items-center justify-center'><CrunchyLogo fill='var(--crunchy-orange)' height="23.69px"/></a>
      <span className='flex-grow'/>
      <a href='#' className='w-15 flex items-center justify-center'><CrownIcon fill='var(--crown-yellow' height="24px" /></a>
      <a href='#' className='w-15 flex items-center justify-center'><SearchIcon fill='var(--secondary-color)' height="24px" /></a>
      <a href='#' className='w-[5.65rem] flex items-center justify-center'>
        <ProfileImage className='w-9 h-9' />
        <ChevronIcon fill='var(--secondary-color)' height="24px" />
      </a>
    </nav>
  )
}

export default Navbar