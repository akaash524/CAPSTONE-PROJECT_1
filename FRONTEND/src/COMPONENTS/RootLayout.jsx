import React from 'react'
import { Outlet } from 'react-router'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import { useAuth } from '../STORES/authStore.js'
import { useEffect } from 'react'
function RootLayout() {
      const checkAuth=useAuth(state=>state.checkAuth)
      const loading=useAuth(state=>state.loading)
    
      useEffect(()=>{
        checkAuth()
      },[])
      if(loading){
        return <p>Loading......</p>
      }
  return (
    <div>
        <Header />
        <div className='mx-20 min-h-screen'>
            <Outlet />
        </div>
        <Footer />

    </div>
  )
}

export default RootLayout