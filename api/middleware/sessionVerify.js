import express from 'express' ;
const SessionVerification = (req,res,next)=>{
    if(!req.session.user)
        return res.status(498).json({msg : "You session has ended"});
    next();
}

export default SessionVerification;
