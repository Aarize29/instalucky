const dotenv = require('dotenv');
dotenv.config();
const instagramAuthUrl = 'https://api.instagram.com/oauth/authorize';
const clientId = process.env.INSTA_CLIENT_ID;
const redirectUri = 'https://instalucky.vercel.app/home';
const scope = 'user_profile,user_media';
const responseType = 'code';

const fullUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${process.env.INSTA_CLIENT_ID}&display=page&extras={"setup":{"channel":"IG_API_ONBOARDING"}}&redirect_uri=${process.env.REDIRECT_URI}&response_type=token&scope=instagram_basic,instagram_content_publish,instagram_manage_comments,instagram_manage_insights,pages_show_list,pages_read_engagement`;

module.exports = fullUrl;