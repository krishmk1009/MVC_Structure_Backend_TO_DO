import { useEffect, useState } from 'react'

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { Toaster } from "react-hot-toast"
import axios from 'axios';
import { useContext } from 'react'
import { Context } from './main'



function App() {
  const { isAuthenticated, setIsAuthenticated, setUser, setLoading } = useContext(Context)

  useEffect(() => {
    setLoading(true)
    axios.get("http://localhost:4000/api/v1/users/me", {
      withCredentials: true,
    })
      .then((res) => {
        setUser(res.data.user)
        setIsAuthenticated(true)
        console.log(res.data.user)
        setLoading(false)
      })
      .catch((error) => {
        setUser({})
        setIsAuthenticated(false)
        setLoading(false)
      })
  }, [])


  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  )
}

export default App
