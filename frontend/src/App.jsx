import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { useDispatch } from 'react-redux'
import { login } from './store/store'

const App = () => {

  const dispatch = useDispatch();

  useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem('user'));
    if(userData){
      dispatch(login({ 
        user: userData.user,
        token: userData.token
      }))

    }
  })



  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default App