import User from "@/models/userModel";
import nodemailer from "nodemailer"
import { v4 as uuidv4 } from 'uuid';


export const sendEmail =async({email,emailType,userId}:any)=>{
  
    // mailservices using mailtrap

    try {
        const hashedToken= await uuidv4()  // const hashedToken= await bcryptjs.hash(userId.toString(),10)

        if (emailType==="VERIFY") {
          await User.findByIdAndUpdate(userId,{
                $set:{verifyToken:hashedToken ,
                  verifyTokenExpiry:Date.now()+3600000}
              })
        } else if(emailType==="Reset"){
          await User.findByIdAndUpdate(userId,{
                 $set:{forgotPasswordToken:hashedToken,
                  forgetPasswordTokenExpiry:Date.now()+3600000} 
              }) 
        } 

        const transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "60db1b0a3eeff1",
            pass: "80f6637b275c37"
          }
        });

         const mailOptions= {
            from: 'sandeep@gmail.com', // sender address
            to: email , // list of receivers
            subject: emailType ==="VERIFY"? "Verify your email" : "Reset your password", // Subject line
            text: "Hello world?", // plain text body
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyeamil?token${hashedToken}">here</a> to ${emailType==="VERIFY"?"verify your email":"Reset your eamil"} </p>
            or copy and paste the link below in your browser.
            <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}`, // html body
          }
        
        const sendReponse= await transport.sendMail(mailOptions)

         return sendReponse

    } catch (error:any) {
         throw new Error(error.message)
    }
}