import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Button } from '@material-tailwind/react';

const Home = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const getUserId = async (longLivedToken) => {
    try {
      const res = await axios.get(`https://graph.facebook.com/v19.0/me/accounts?fields=id%2Cname%2Caccess_token%2Cinstagram_business_account&access_token=${longLivedToken}`);
      return res.data.data[0].instagram_business_account.id;
    } catch (error) {
      console.error('Error fetching user id:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = location.hash;
      const parameters = url.split('&');
      let longLivedToken = '';

      parameters.forEach(param => {
        if (param.includes('long_lived_token=')) {
          longLivedToken = param.split('=')[1];
        }
      });

      const userId = await getUserId(longLivedToken);
      localStorage.setItem("accesstoken", longLivedToken);
      localStorage.setItem("userid", userId);
      setLoading(false);
    };

    fetchData();
  }, [location.hash]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">Welcome to Your Dashboard</h1>
        </div>
        <div className="flex justify-center">
         <Button> <Link to="/posts" >View Posts</Link></Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
