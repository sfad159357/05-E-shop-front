import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button  from './common/Button'
import './Navbar.css'

function Navbar({ user }) {
    console.log('user',user)
    
    const style = { color: "yellow" };
    const activestyle = {
        fontWeight: "bold",
        color: "black",
    };

    const [clicked, setClicked] = useState(false)
    const [hasButton, setButton] = useState(true)

    // 只要點擊，原本是false set為true，是true set為false
    const handleClick = () => setClicked(!clicked)
    const closeMobileMenu = () => setClicked(false)

    // 當視窗小於960px就設false
    const showButton = () => {
        if (window.innerWidth <= 960) { setButton(false) }
        else {setButton(true)}
    }

    // 當初次渲染時，就呼叫showButton，就算還沒resize視窗，也能使用此函式
    useEffect(() => {
        showButton();
    }, [])

    // 一旦視窗縮放，呼叫此函式
    window.addEventListener('resize', showButton)
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
                  {user && (
                      <>
                  <li className="nav-item">
                      <Link to='/update-products' className='nav-links' onClick={closeMobileMenu}>更新產品</Link>
                  </li>
                    <li className="nav-item">
                    <Link to='/profile' className='nav-links btn--outline' onClick={closeMobileMenu}>您好，{user.name}</Link>
                      </li>
                      <li className="nav-item">
                    <Link to='/logout' className='nav-links btn--outline' onClick={closeMobileMenu}>登出</Link>
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
   
                {/* {hasButton && <Button path='/login' buttonStyle="btn--outline">登入會員</Button>}
              {hasButton && <Button path='/register' buttonStyle="btn--outline">註冊會員</Button>} */}

          </nav>
      </>
  )
}

export default Navbar