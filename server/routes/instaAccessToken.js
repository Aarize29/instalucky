const router= require('express').Router();
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

router.post('/getaccesstokens', async (req, res) => {
    const formData = new URLSearchParams();
    console.log(req.body.code);
    formData.append('client_id', process.env.INSTA_CLIENT_ID);
    formData.append('client_secret', process.env.INSTA_CLIENT_SECRET);
    formData.append('grant_type', 'authorization_code');
    formData.append('redirect_uri', 'https://instalucky.vercel.app/home');
    formData.append('code', req.body.code); 
  
    try {
        const response = await axios.post('https://api.instagram.com/oauth/access_token', formData);
      console.log(response.data);
       const longLivedToken=await axios.get(`https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${process.env.INSTA_CLIENT_SECRET}&access_token=${response.data.access_token}`)

      console.log(longLivedToken)
      res.json({'access_token':longLivedToken.data.access_token, 'user_id':response.data.user_id}); 
    } catch (error) {
       console.log(error); 
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports=router;