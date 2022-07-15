import nodemailer from "nodemailer";
import mailMessage from "./mailMessage.js";
  
const mailVerification = async(to,msg)=>{
    const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port : 587,
        secure: false,
        auth : {
            user: process.env.USER,
            pass: process.env.PASSWORD ,
        }
    })
    await transporter.sendMail({
        from:process.env.USER,
        to:to,
        subject : 'Email Verification',
        html: `${mailMessage(msg)}`,
    })
    
}
export default mailVerification;