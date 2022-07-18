import express from 'express';
import Expects from '../models/Expects.js';

const expects = express.Router();



expects.get('/:username');

expects.post('/addexpect/:username',async(req,res)=>{
    console.log(req.params.username);
    console.log(req.body);
    res.status(200).send("done");

})


export default expects ; 