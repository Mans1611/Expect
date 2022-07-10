const express = require('express');
const mongoose = require('mongoose');
const register = require('./routes/register');
const app = express();
const port = 8000;

require('dotenv').config();
//middlewares

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(express.static(''));

app.use('/',register)
const cors = require('cors');
app.use(cors());


//const uri = process.env.ATLAS_URI ; // the variable name in .env file
mongoose.connect('mongodb://127.0.0.1:27017/expect',{useNewUrlParser:true}); // we connect it to the database

mongoose.connection.once('open',()=>{
    console.log("You are connected to the cloud database");
})
app.listen(port,()=>{
    console.log("http://localhost:" + port);
    // console.log(window.location.href);
})