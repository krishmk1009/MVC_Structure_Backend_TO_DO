import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../main'
import axios from "axios"
import { toast } from 'react-hot-toast'

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const {data} = await axios.post("http://localhost:4000/api/v1/users/login", {
        email, password
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      })

      toast.success(data.message)
      setIsAuthenticated(true);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error)
      setIsAuthenticated(false);
    }

  }


  if (isAuthenticated) return <Navigate to={"/"} />;
  return (
    <div className='login'>
      <section>
        <form onSubmit={submitHandler}>

          <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
          <button type='submit'>Login </button>
        </form>
      </section>
    </div>
  )
}

export default Login