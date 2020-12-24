require('./models/db')
const express = require('express');
const path = require('path');
const app = express();
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/public')));

const routers = require('./router/auth')
const postroute = require('./router/posts');
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({  handlebars: allowInsecurePrototypeAccess(Handlebars), extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

const PORT = process.env.PORT||8000;
app.listen(PORT,()=>{
    console.log("Server Running on port 8000");
})
//middleware
app.use(express.json());
//route middlewares
app.use('/user',routers);
app.use('/posts',postroute);