require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./db/conn")
const PORT = 6005;
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const InstagramStrategy = require('passport-instagram').Strategy;
const userdb = require("./model/userSchema")

const clientid = process.env.GOOGLE_CLIENT_ID;
const clientsecret = process.env.GOOGLE_CLIENT_SECRET;


app.use(cors({
    origin:"http://localhost:5173",
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}));
app.use(express.json());

// setup session
app.use(session({
    secret:"YOUR SECRET KEY",
    resave:false,
    saveUninitialized:true
}))

// setuppassport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy({
        clientID:clientid,
        clientSecret:clientsecret,
        callbackURL:"/auth/google/callback",
        scope:["profile","email"]
    },
    async(accessToken,refreshToken,profile,done)=>{
        try {
            let user = await userdb.findOne({googleId:profile.id});

            if(!user){
                user = new userdb({
                    googleId:profile.id,
                    displayName:profile.displayName,
                    email:profile.emails[0].value,
                    image:profile.photos[0].value
                });

                await user.save();
            }

            return done(null,user)
        } catch (error) {
            return done(error,null)
        }
    }
    )
)


//using instagram strategy
passport.use(new InstagramStrategy({
    clientID: 'YOUR_INSTAGRAM_CLIENT_ID',
    clientSecret: 'YOUR_INSTAGRAM_CLIENT_SECRET',
    callbackURL: 'http://localhost:5173/auth/instagram/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists in the database
      let user = await User.findOne({ instagramId: profile.id });
  
      if (!user) {
        // Create a new user
        user = new User({
          instagramId: profile.id,
          accessToken,
          refreshToken,
        });
        await user.save();
      } else {
        // Update access token and refresh token
        user.accessToken = accessToken;
        user.refreshToken = refreshToken;
        await user.save();
      }
  
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));


passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
});

// initial google ouath login
app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

app.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect:"http://localhost:5173/home",
    failureRedirect:"http://localhost:5173/login"
}))

app.get("/login/sucess",async(req,res)=>{

    if(req.user){
        res.status(200).json({message:"user Login",user:req.user})
    }else{
        res.status(400).json({message:"Not Authorized"})
    }
})

app.get("/logout",(req,res,next)=>{
    req.logout(function(err){
        if(err){return next(err)}
        res.redirect("http://localhost:5173/");
    })
})

//Random Id generator
function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
  const urlId=makeid(12)
//stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.post('/create-checkout-session', async (req, res) => {
    try {
        const { amount, currency, email } = req.body;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: email,
            billing_address_collection: 'auto',
            shipping_address_collection: {
                allowed_countries: ['US', 'CA', 'IN', 'GB', 'AU'],
            },
            line_items: [
                {
                    price_data: {
                        currency,
                        product_data: {
                            name: 'instalucky',
                        },
                        unit_amount: amount,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:5173/posts', // Redirect URL after successful payment
            cancel_url: 'http://localhost:5173/cancel', // Redirect URL if payment is canceled
        });

        res.json({ url: session.url, id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.listen(PORT,()=>{
    console.log(`server start at port no ${PORT}`)
})