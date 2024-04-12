import  axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import { PaymentCard } from '../components/PaymentCard';
const Home = () => {
    const [userdata, setUserdata] = useState({});
    console.log("response", userdata)

    const getUser = async () => {
        try {
            const response = await axios.get("http://localhost:6005/login/sucess", { withCredentials: true });

            setUserdata(response.data.user)
        } catch (error) {
            console.log("error", error)
        }
    }

    useEffect(() => {
        getUser()
    }, [])
  return (
    <div>
        <Navbar/>
        <div className='flex items-center justify-start '>
        <PaymentCard/>
        </div>
    </div>
  )
}

export default Home