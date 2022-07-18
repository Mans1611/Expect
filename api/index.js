import  express, {Router} from 'express';
import  mongoose from 'mongoose';
import dotenv from 'dotenv'

import  matchesRoute from './routes/matches.js';
import  countryRoute from './routes/country.js';
import news from './routes/news.js'
import cors from 'cors' ;
dotenv.config();
import register from './routes/register.js';
import users from './routes/users.js';
import expects from './routes/expects.js';


const app = express();
const port = process.env.PORT|| 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// middleware
app.use('/matches',matchesRoute);
app.use('/country',countryRoute);
app.use('/news',news);
app.use('/register',register);
app.use('/users',users);
app.use('/expects',expects);

app.use(cors());

//const uri = process.env.ATLAS_URI ; // the variable name in .env file
mongoose.connect('mongodb://127.0.0.1:27017/expect',{useNewUrlParser:true}); // we connect it to the database

mongoose.connection.once('open',()=>{
    console.log("You are connected to the cloud database");
})
app.listen(port,()=>{
    console.log("http://localhost:" + port);
})


