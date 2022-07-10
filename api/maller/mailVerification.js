import nodemailer from "nodemailer";

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
        html:`
        <div style="background-color:#ddd;border-raduis:10px">
            <h2>
                <a target="_blank" href = ${msg}>click here to verify</a>
            </h2>
        </div>
        `,
    })
    
}
export default mailVerification;