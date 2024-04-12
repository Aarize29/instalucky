const mongoose = require("mongoose");

const DB = 'mongodb://localhost:27017/instagramLucky';

mongoose.connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>console.log("database connected")).catch((err)=>console.log("errr",err))