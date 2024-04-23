const router= require('express').Router();
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

router.post('/getaccesstokens', async (req, res) => {
    // const formData = new URLSearchParams();
    // console.log(req.body.code);
    // formData.append('client_id', process.env.INSTA_CLIENT_ID);
    // formData.append('client_secret', process.env.INSTA_CLIENT_SECRET);
    // formData.append('grant_type', 'authorization_code');
    // formData.append('redirect_uri', 'https://instalucky.vercel.app/home');
    // formData.append('code', req.body.code); 
  
    try {
        const url = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${process.env.INSTA_CLIENT_ID}&display=page&extras={"setup":{"channel":"IG_API_ONBOARDING"}}&redirect_uri=${process.env.REDIRECT_URI}&response_type=token&scope=instagram_basic,instagram_content_publish,instagram_manage_comments,instagram_manage_insights,pages_show_list,pages_read_engagement`;
        
        res.redirect(url)
      //  const longLivedToken=await axios.get(`https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${process.env.INSTA_CLIENT_SECRET}&access_token=${response.data.access_token}`)

      
      //res.json({'access_token':longLivedToken.data.access_token, 'user_id':response.data.user_id}); 
    } catch (error) {
       console.log(error); 
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports=router;