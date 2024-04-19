import { Button } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import {useLocation , useParams} from 'react-router-dom'
import axios from 'axios'

const Navbar = () => {
    const location=useLocation()
    const params=useParams()
    console.log(params)
    
    const code=location.search.split("=")[1]
    
   const {pathname}=location
    const loginwithgoogle = ()=>{
        window.open("http://localhost:6005/auth/google/callback","_self")
    }
    const loginwithfacebook = ()=>{
        window.open("http://localhost:6005/auth/facebook","_self")
    }
    const loginWithInstagram = async () => {
       const res=await fetch("http://localhost:3000/user/auth/instagram",{
              method:"GET",
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:false

       })

         const data=await res.json()
         window.open(data,"_self")
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
                
                <Button  onClick={loginWithInstagram}>
                Login with Instagram
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