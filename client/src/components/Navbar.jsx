import { Button } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import {useLocation } from 'react-router-dom'

const Navbar = () => {
    const location=useLocation()
    const {pathname} = location
    console.log("pathname", pathname)
    const loginwithgoogle = ()=>{
        window.open("http://localhost:6005/auth/google/callback","_self")
    }
    const loginwithinstagram = async () => {
        try {
            const res = await fetch("http://localhost:6005/insta/authorize", {
                method: "GET",
                credentials: 'include' // Include cookies in the request
            });
            if (res.redirected) {
                window.location.href = res.url; // Redirect to the Instagram authorization page
            } else {
                throw new Error('Failed to redirect');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    const logout = ()=>{
        window.open("http://localhost:6005/logout","_self")
    }

    const [user, setUser] = useState({})
    const getuser = async()=>{
        try {
            const response = await axios.get("http://localhost:6005/login/sucess", { withCredentials: true });
            setUser(response.data.user)
        } catch (error) {
            console.log("error", error)
        }
    }
  return (
    <>
     <div className="bg-white shadow-lg">
        <div className="container mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
            <div className="hidden w-full text-gray-600 md:flex md:items-center">
                <span>Logo</span>
            </div>
            <div className="w-full text-gray-700 md:text-center text-2xl font-semibold">
                App-name
            </div>
            <div className="hidden w-full text-gray-600 md:flex md:items-center">
              {pathname === "/" ?
                <div className="flex items-center justify-end w-full">
                <Button  onClick={loginwithgoogle}>
                    Login
                </Button>
                <Button  onClick={loginwithinstagram}>
                Login
            </Button>
                </div>
                :
                <Button  onClick={logout}>
                    Logout
                </Button>
              }
            </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Navbar