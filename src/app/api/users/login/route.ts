import {connect} from '@/dbConfig/dbConfig'
import User from "@/models/userModel"
import {NextRequest,NextResponse} from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"


connect()

 export async function POST(request:NextRequest){
     
   try {
        
      const reqBody = await request.json()
      console.log(reqBody);
      
      const {email,password}=reqBody
    
      const user =await User.findOne({email})

      if (!user) {
        return NextResponse.json({massage:"User does not exist"},{status:400})
      }
      console.log(user)

      const vaildPassword = await bcryptjs.compare(password,user.password)

      if (!vaildPassword) {
        return NextResponse.json({massage:"chack your credentials"},
            {status:400})
      }
   
      const tokenData={
         id:user._id,
         username:user.username,
         email:user.email
      }

      const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn:"1h"})

     const response =  NextResponse.json({
         message:"Logged in success",
         success:true,
      })

      response.cookies.set("token",token,{
         httpOnly:true
      })

      return response

   } catch (error:any) {
      return NextResponse.json({error:error.massage},{status:500})
   }

}