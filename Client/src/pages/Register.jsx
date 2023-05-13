import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { useContext } from 'react'
import { Context } from '../main'
//https://node-todo-dn1c.onrender.com
import axios from "axios"
import { server } from '../main'
const Register = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(Context)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const data = await axios.post(`http://localhost:4000/api/v1/users/new`, {
                name, email, password
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            })
            toast.success(data.message)
            setIsAuthenticated(true);

        } catch (error) {
            toast.error("some error")
            console.log(error)
            setIsAuthenticated(false);
        }


    }

    if (isAuthenticated) return <Navigate to={"/"} />
    return (
        <div className='login'>

            <section>
                <form onSubmit={submitHandler}>
                    <input value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='Name' required />
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
                    <button type='submit'>Sign Up</button>
                    <h4>Or</h4>
                    <Link to="/login">Log In</Link>
                </form>
            </section>

        </div>
    )
}

export default Register