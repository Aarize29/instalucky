import  axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import { PaymentCard } from '../components/PaymentCard';
import {useLocation , useParams} from 'react-router-dom'



const Home = () => {
    const location=useLocation()    
    const code=location.search.split("=")[1]
    

    const handleAccessTokens = async () => {
       const response=await fetch('http://localhost:3000/user/getaccesstokens',{
           method:'POST',
           headers:{
               'Content-Type':'application/json'
           },
           body:JSON.stringify({
               code:code
           })

       })
       
       const data=await  response.json()

       console.log(data)
       localStorage.setItem("accesstoken",data.access_token)
       localStorage.setItem("userid",data.user_id)


    }
    useEffect(() => {
      handleAccessTokens()
    }, [])
    
  return (
    <div>
        <Navbar/>
        <div className='flex items-center justify-start '>
        <PaymentCard/>
        {/* <button onClick={handleAccessTokens}>Get Access Tokens</button> */}
        </div>
    </div>
  )
}

export default Home