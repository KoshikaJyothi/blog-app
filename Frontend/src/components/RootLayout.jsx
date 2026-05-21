import React from 'react'
import Home from './Home'
import Header from './Header'
import {Outlet} from 'react-router'
import Footer from './Footer'
function RootLayout() {
  return (
    <div>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default RootLayout