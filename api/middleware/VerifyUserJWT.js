import jwt from 'jsonwebtoken'

const VerifyUserJWT = (req,res,next)=>{
    const token = req.headers["token"];
    if(!token)   
        return res.status(404).json({msg : "Provide a token"});
    try{
        const userPayLoad = jwt.verify(token,process.env.JWT);

    }catch(err){
        res.status(400).send()
    }
}

export default VerifyUserJWT;