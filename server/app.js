const express=require('express');
const cors=require('cors');
const session=require('express-session');
const connectDB=require('./db/connectDB');
const userRouter=require('./routes/user.instalogin')
const getaccesstokens=require('./routes/instaAccessToken')
const app=express();
const port=3000;
app.use(cors());
app.use(express.json());

app.use(session({
    secret:'secretInstaLucky',
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false}
}));



app.use('/user', userRouter);
app.use('/user',getaccesstokens)
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
