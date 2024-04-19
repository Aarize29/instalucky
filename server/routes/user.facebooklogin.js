const router = require('express').Router();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../model/usermodel');
const dotenv = require('dotenv');
dotenv.config();

passport.use(new FacebookStrategy({
    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FB_APP_SECRET,
    callbackURL: 'http://localhost:5173/home'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await User.findOne({ email: profile.emails[0].value });
        if (user) {
            user.accessToken = accessToken;
            await user.save();
            done(null, user);
        } else {
            const newUser = new User({
                email: profile.emails[0].value,
                accessToken: accessToken
            });
            await newUser.save();
            done(null, newUser);
        }
    } catch (error) {
        done(error, false);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'], permission: ['public_profile, instagram_basic']}));
router.get('/auth/facebook/callback', passport.authenticate('facebook',
 { 
     successRedirect: '/home',
     failureRedirect: '/' 
}));

module.exports = router;
