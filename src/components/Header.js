import { useState } from "react"
import { NavLink,Link } from "react-router-dom"

const Header = () => {
  const [isShowNavMenu, setIsShowNavMenu] = useState(false)

  return (
    <div className='header-wrapper'>
      <div className="header-inner">
        <Link 
          className='header-logo'
          to='/'  
        >
          <img src={'/assets/img/logo.png'} alt='ảnh'/>
        </Link>
        <div className={`header-nav ${isShowNavMenu ? 'show' : ''}`}>
          <NavLink
            to='/'
            end
            className={({ isActive }) =>
              `header-nav-item ${isActive ? 'active' : ''}`
            }
          >
            <span>Khóa học</span>
          </NavLink>
          <NavLink
            to='/courses'
            className={({ isActive }) =>
              `header-nav-item ${isActive ? 'active' : ''}`
            }
          >
            <span>Yêu thích</span>
          </NavLink>
          <div className="header-nav-item log-in">
            <span>
              log in
            </span>
          </div>
          <div className="header-nav-item sign-up">
            <span>
              sign up
            </span>
          </div>
        </div>
        <div className={`header-btn ${isShowNavMenu ? 'active' : ''}`}
          onClick={() => setIsShowNavMenu(prev => !prev)}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default Header
