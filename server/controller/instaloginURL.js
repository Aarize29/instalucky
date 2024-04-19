const dotenv = require('dotenv');
dotenv.config();
const instagramAuthUrl = 'https://api.instagram.com/oauth/authorize';
const clientId = process.env.INSTA_CLIENT_ID;
const redirectUri = 'https://instalucky.vercel.app/home';
const scope = 'user_profile,user_media';
const responseType = 'code';

const fullUrl = `${instagramAuthUrl}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&response_type=${responseType}`;

module.exports = fullUrl;