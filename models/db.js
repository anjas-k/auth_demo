const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Auth_demo',{useNewUrlParser:true
,useUnifiedTopology: true},(err)=>{
    if (err) throw err
        console.log("database connected successfuly...")
})