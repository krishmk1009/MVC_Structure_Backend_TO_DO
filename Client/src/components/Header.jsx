import React from 'react'
import { Link, Navigate } from 'react-router-dom'

import { useContext } from 'react'
import { Context } from '../main'
import axios from "axios"
import { toast } from 'react-hot-toast'


const Header = () => {
    const logoutHandler = async () => {
        try {

            await axios.get("http://localhost:4000/api/v1/users/logout", {
                withCredentials: true,
            })


            toast.success("logout Succeffully");
            setIsAuthenticated(false)
        } catch (error) {
            toast.error(error)
            setIsAuthenticated(true)
        }
    }


    const { isAuthenticated, setIsAuthenticated } = useContext(Context)
    return (
        <nav className='header'>
            <div>
                <h2>
                    Todo App
                </h2>

            </div>
            <article>
                <Link to={"/"}>Home</Link>
                <Link to={"/profile"}>Profile</Link>

                <Link to={"/register"}>Register</Link>
                {
                    isAuthenticated ? <button onClick={logoutHandler} className='btn'> Logout</button> :
                        <Link to={"/login"}>Login</Link>
                }
                {/* <button className='btn'>Login</button> */}
            </article>

        </nav>
    )
}

export default Header