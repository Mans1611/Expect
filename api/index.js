import  express, {Router} from 'express';
import  mongoose from 'mongoose';
import dotenv from 'dotenv'

import  matchesRoute from './routes/matches.js';
import  countryRoute from './routes/country.js';
import news from './routes/news.js'
import cors from 'cors' ;
import http from 'http' ;
dotenv.config();
import register from './routes/register.js';
import users from './routes/users.js';
import expects from './routes/expects.js';
import { Server } from 'socket.io';
import { updateMatch } from './socket.ioFunctions/updateMatch.js';
import { getMatches } from './socket.ioFunctions/getMatches.js';
import Matches from './models/Matches.js';
import admin from './routes/admin.js';
import statistics from './routes/statistics.js';
import session from 'express-session';
import MongoSessions from 'connect-mongodb-session'; // to connect the session in the DB
import team from './routes/team.js';

const MongoDBSession = MongoSessions(session);

const app = express();

// creating a collections for sessions. 
const storeSession = new MongoDBSession({
    uri : 'mongodb://127.0.0.1:27017/expect',
    collection : "Users_Sessions",
})


const server = http.createServer(app);
const port = process.env.PORT|| 8000;


const io = new Server(server,{
    cors:{
        origin : "http://localhost:5000",
    }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    resave : false,
    secret : "mansour is an idiot man",
    saveUninitialized : false,
    cookie : {
        maxAge : 1000 * 60 * 60 ,
        httpOnly : false
    },
    store : storeSession        
}))

// middleware
app.use('/matches',matchesRoute);
app.use('/country',countryRoute);
app.use('/news',news);
app.use('/register',register);
app.use('/users',users);
app.use('/expects',expects);
app.use('/admin',admin);
app.use('/statistics',statistics);
app.use('/team',team);

app.use(cors());

//const uri = process.env.ATLAS_URI ; // the variable name in .env file
mongoose.connect('mongodb://127.0.0.1:27017/expect',{useNewUrlParser:true}); // we connect it to the database

mongoose.connection.once('open',()=>{
    console.log("You are connected to the cloud database");
})

io.on('connection',(socket)=>{
    try{
        socket.on('updatingMatch',async (data)=>{ 
           
            await updateMatch(data);
            const matches = await Matches.find();
            socket.broadcast.emit("updatingMatches",matches);  
        })
        
    }

    catch(err){
        console.log(err);
    }

    

})

server.listen(port,()=>{
    console.log("http://localhost:" + port);
})


