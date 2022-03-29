import React from 'react'
import Button  from './common/Button'
import './HeroSection.css'
import '../App.css'

function HeroSection() {
  return (
      <div className='hero-container'>
      <video src='/videos/video-1.mp4' autoPlay loop muted />
        <h1>TRVL電子商城網站</h1>
        <p>心動不如馬上行動</p>
        <div className='hero-btns'>
          <Button buttonStyle='btn--outline' buttonSize='btn--large'>
            開始
          </Button>
          <Button buttonStyle='btn--primary' buttonSize='btn--large'>
            觀看預告片<i className='fa fa-play-circle' />
          </Button>

      </div>
      
    </div>
  )
}

export default HeroSection