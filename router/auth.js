const express = require('express');
var router = express.Router();
const User = require('../models/User');
const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken');
const {registervalidation} = require('./validation') //if validation.js content pasted here..there is no use of this sentance
const {loginvalidation} = require('./validation');

router.get('/register', (req, res) => {
    res.render("pages/registerpg", {
        style : "register.css"
    });
});


router.post('/register', async (req,res)=>{
    //validate the data before we a user
    //const {error} = schema.validate(req.body)
    const {error} = registervalidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    ////////////////////
    //checking a user already present in database
    const emailexist = await User.findOne({email:req.body.email});
   // if (emailexist) return res.status(400).send("<h2>Email is already Exist..</h2>")

    if (emailexist) return res.render("pages/registerpg",{
        style:'register.css',
        displayerr:"Email is already exist"
    })

    //Hash passwords
    var salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        //password: req.body.password
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        //res.send(savedUser);
        res.redirect('/user/home')
        //res.send({user:user._id});
    }catch(err){
        res.status(400).send(err);
    }
})

//login
router.get('/login', (req, res) => {
    res.render("pages/loginpg", {
        style : "login.css"
    });
});

router.post('/login', async (req,res)=>{
    const {error} = loginvalidation(req.body);
    /*
     displayerr = error.details[0].message;
    if(error) return res.status(400).render("pages/loginpg",{
        style :"login.css",
        displayerr,
    });*/
    if(error) return res.status(400).send(error.details[0].message);
    const user = await User.findOne({email:req.body.email});
    //if (!user) return res.status(400).send("Email is not found");

    if (!user) return res.render("pages/loginpg",{
        style:'login.css',
        displayerr:"Email is not found"
    })
    //check password
    const validpass = await bcrypt.compare(req.body.password,user.password);
    //if (!validpass) return res.status(400).send("Password is invalid");

    if (!validpass) return res.render("pages/loginpg",{
        style:'login.css',
        displayerr:"Password is invalid"
    })
    res.redirect('/user/home')

    //create and assign a token
    const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token)

    
    //res.send("Logged in successfully.....")
})


////HOME

router.get('/home', (req, res) => {
    res.render("pages/homepg", {
        style : "home.css"
    });
});

module.exports = router;