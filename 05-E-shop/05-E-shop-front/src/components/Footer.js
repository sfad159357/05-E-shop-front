import React from 'react'
import Button from './common/Button'
import {Link} from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
      <div className='footer-container'>
          <section className='footer-subscription'>
              <p className='footer-subscription-heading'>
                輸入聯絡資訊即可獲得我們最新資訊
              </p>
              <div className='input-area'>
                  <form>
                      <input className='footer-input' type='email' name='email' placeholder='你的信箱' />
                      <Button path='/subscribe' buttonStyle='btn--outline' >訂閱</Button>
                  </form>
              <p className='footer-subscription-text'>
                    您可以隨時取消訂閱
              </p>
              </div>
          </section>
          <div className='footer-links'>
              <div className='footer-links-wrapper'>
                  <div className='footer-links-items'>
                      <h2>關於我們</h2>
                      <Link to='/service'>故事介紹</Link>
                      <Link to='/service'>景點探索</Link>
                      <Link to='/service'>服務條款</Link>
                  </div>
                 <div className='footer-links-items'>
                      <h2>聯絡我們</h2>
                      <Link to='/products'>支持我們</Link>
                      <Link to='/products'>聯絡資訊</Link>
                      <Link to='/products'>服務條款</Link>
                  </div>
              </div>
              <div className='footer-links-wrapper'>
                  <div className='footer-links-items'>
                      <h2>影片</h2>
                      <Link to='/service'>其他影片</Link>
                      <Link to='/service'>日常生活</Link>
                      <Link to='/service'>下載影片</Link>
                  </div>
                 <div className='footer-links-items'>
                      <h2>社群媒體</h2>
                      <Link to='/products'>臉書</Link>
                      <Link to='/products'>IG</Link>
                      <Link to='/products'>Twitter</Link>
                  </div>
              </div>
          </div>
          <section className='social-media'>
              <div className='social-media-wrapper'>
                  <div className='footer-logo'>
                      <Link to='/' className='link-logo'>TRVL<i className='fab fa-typo3'/></Link>
                  </div>
                  <small className='website-right'>TRVL @2022</small>
                  <div className='social-icons'>
                      <Link className='social-icon-link facebook' to='/' target='_blank' aria-label='facebook'>
                          <i className='fab fa-facebook-f' />
                      </Link>
                      <Link className='social-icon-link instagram' to='/' target='_blank' aria-label='instagram'>
                          <i className='fab fa-instagram' />
                      </Link>
                      <Link className='social-icon-link twitter' to='/' target='_blank' aria-label='twitter'>
                          <i className='fab fa-twitter' />
                        </Link>
                  </div>
            </div>
          </section>
      </div>
  )
}

export default Footer