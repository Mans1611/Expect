import jwt from 'jsonwebtoken';


const verifyAdmin = (req,res,next)=>{
    const token = req.header('token');

    if(!token)
        return res.status(404).json({msg : "Token is not provided"}); 
    const adminPayload =  jwt.verify(token,process.env.JWT);
    next();
}

export default verifyAdmin;