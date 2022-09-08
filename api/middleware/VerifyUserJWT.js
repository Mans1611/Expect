import jwt from 'jsonwebtoken'

const VerifyUserJWT = (req,res,next)=>{
    const token = req.headers["token"];
    const userName = req.headers["userglob"];
    if(!token)   
        return res.status(404).json({msg : "Provide a token"});
    try{
        const userPayload = jwt.verify(token,process.env.JWT);
        
        if(userName !== userPayload.userName)
            return res.status(402).json({msg : "Wrong UserName"});

        next();
    }catch(err){
        res.status(400).send()
    }
}

export default VerifyUserJWT;