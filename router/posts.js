const express = require('express');
const verify = require('./verifyToken');


var router = express.Router();
router.get('/',verify,(req,res)=>{
    res.json({
        posts:{
            title:"my first post",
        description:'random data cannot be access'
        }
    });
});
module.exports=router;