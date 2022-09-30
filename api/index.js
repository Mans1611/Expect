import  express from 'express';
import  mongoose from 'mongoose';
import dotenv from 'dotenv'
import http from 'http' ;
import cors from 'cors' ;
import session from 'express-session';
import MongoSessions from 'connect-mongodb-session'; // to connect the session in the DB
import { Server } from 'socket.io';
import  countryRoute from './routes/country.js';
import register from './routes/register.js';
import news from './routes/news.js'
import  matchesRoute from './routes/matches.js';
import users from './routes/users.js';
import expects from './routes/expects.js';
import { updateMatch } from './socket.ioFunctions/updateMatch.js';
import Matches from './models/Matches.js';
import admin from './routes/admin.js';
import statistics from './routes/statistics.js';
import team from './routes/team.js';
import { SortingTeams, SortingUsers } from './routes/utilis/SortingTeams.js';
import feedback from './routes/feedBack&support.js';
import { fileURLToPath } from 'url';
import path ,{dirname} from 'path';
import pvp from './routes/pvp.js';
import player from './routes/player.js';
import Redis from 'redis';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const MongoDBSession = MongoSessions(session);


// export const client = Redis.createClient();  // in production to heroku you need to provide url of the server {} 
// await client.connect();

// client.on("error", function(err) {
//     console.error("Error connecting to redis", err);
//   })

const app = express();





// creating a collections for sessions.
const storeSession = new MongoDBSession({
    uri : process.env.ATLAS_URI,
    collection : "Users_Sessions",
}) 



app.use(cors());

const server = http.createServer(app);

const port = process.env.PORT|| 8000;


const io = new Server(server,{
    cors:{
         origin : "https://expect-app.herokuapp.com/",
        //origin : "http://localhost:5000" ,

    methods : ["GET","POST","PUT","DELETE"],
        allowedHeaders: ["my-custom-header"],
        credentials : true
     }
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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
app.use('/feedback',feedback);
app.use('/player',player);
app.use('/pvp',pvp);

// app.use(session({
//     resave : false,
//     secret : "mansour is an idiot man",
//     saveUninitialized : false,
//     cookie : {
//         maxAge : 1000 * 60 * 60 ,
//         httpOnly : false
//     },
//     store : storeSession
// }))








//const uri = process.env.ATLAS_URI ; // the variable name in .env file
mongoose.connect(process.env.ATLAS_URI,{useNewUrlParser:true}); // we connect it to the database

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

//for production in heroku

app.use(express.static(path.join(__dirname,'/expect/build')))

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'/expect/build','index.html'))
})

server.listen(port,()=>{
    console.log("http://localhost:" + port);
    (async()=>{
        await SortingTeams();
        await SortingUsers();
    })()

})


