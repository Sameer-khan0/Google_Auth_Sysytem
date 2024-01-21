import React from 'react'
import user from '../assets/img/user.jpg'
import './css/home.css'

function Home() {
  return (
    <div className='home'>
      <div className="homeb0x">
        <div className="userimg">
        <img src={user} alt="img" />
        </div>
        <h1>Wellcome <b style={{color:'#04c0c6'}}>Sir</b></h1>
      full project will come soon
      </div>
    </div>
  )
}

export default Home
