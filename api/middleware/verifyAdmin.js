import jwt from 'jsonwebtoken';


const verifyAdmin = (req,res,next)=>{
    const token = req.header('token');

    if(!token)
        return res.status(401).json({msg : "Token is not provided"}); 
    try{
        const adminPayload =  jwt.verify(token,process.env.JWT);
        
        if(adminPayload.isAdmin)
            next();
        else{
            res.status(401).json({msg : "You are not aloowed to be here"});
        } 
    }catch(err){
        res.status(401).json({msg : "please check the token provided"});
    }
}

export default verifyAdmin;