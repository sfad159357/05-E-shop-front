import React, { useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import Button from './common/Button'
import { CartContext } from '../App'
import './Navbar.css'

function Navbar({ user }) {
    
   

    const [clicked, setClicked] = useState(false)
  
    const {cart} = useContext(CartContext)

    // 只要點擊，原本是false set為true，是true set為false
    const handleClick = () => setClicked(!clicked)
    const closeMobileMenu = () => setClicked(false)

    
  return (
      <>
          <nav className='navbar'>
              {/* <div className='nav-container'></div> */}
              <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                TRVL <i className='fab fa-typo3' />
              </Link>
              <div className="menu-icon" onClick={handleClick}>
                  {/* 點擊觸發setClick，導致判斷是否改變圖形樣貌 */}
                  <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}/>
              </div>
                {/* 點擊觸發setClick，改變css樣式 */}
              <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                  <li className="nav-item">
                      <Link to='/' className='nav-links' onClick={closeMobileMenu}>回首頁</Link>
                  </li>
                  <li className="nav-item">
                      <Link to='/products' className='nav-links' onClick={closeMobileMenu}>產品內容</Link>
                  </li>
                <li className="nav-item">
                      <Link to='/cart' className='nav-links' onClick={closeMobileMenu}>購物車</Link>
                      <span className="position-relative translate-middle badge rounded-pill bg-danger">{cart.length  }</span>
                  </li>
                  {user && (
                      <>
                  <li className="nav-item">
                      <Link to='/update-products' className='nav-links' onClick={closeMobileMenu}>更新產品</Link>
                  </li>
                    <li className="nav-item">
                    <Link to='/profile' className='nav-links' onClick={closeMobileMenu}>您好: {user.name}</Link>
                      </li>
                      <li className="nav-item">
                    <Link to='/logout' className='nav-links ' onClick={closeMobileMenu}>登出</Link>
                  </li>
                     </> 
                  )}
                  {!user && (
                      <>
                    <li className="nav-item">
                    <Link to='/login' className='nav-links' onClick={closeMobileMenu}>登入會員</Link>
                      </li>
                      <li className="nav-item">
                    <Link to='/register' className='nav-links' onClick={closeMobileMenu}>註冊會員</Link>
                  </li>
                     </> 
                  )}
              </ul>
          </nav>
      </>
  )
}

export default Navbar