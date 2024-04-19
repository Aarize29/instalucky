const router = require('express').Router();
const User = require('../model/usermodel');
const fullUrl = require('../controller/instaloginURL');
const dotenv = require('dotenv');
dotenv.config();



router.get('/auth/instagram', (req, res) => {
  res.json(fullUrl);
});

module.exports = router;
