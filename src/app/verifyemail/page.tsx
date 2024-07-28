'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
// import toast from 'react-hot-toast'
import Link from 'next/link'
import { log } from 'console'



export default function verifyEmailPage() {
    
    
    //    const router = useRouter()
   
    const [token,setToken]=useState("")
    const [verified,setVerified]=useState(false)
    const [error,setError]=useState(false)

    

    
    
    const verifyUserEmail = async ()=>{
        try {
            await axios.post('/api/users/verifyemail',{token})
             setVerified(true)
             
        } catch (error:any) {
            setError(true)
            console.log(error.response.data);
            // toast.error(error.response.data)  
             
        }

    }
    useEffect(()=>{
        const urlToken=window.location.search.split("=")[1]
         console.log(urlToken);
        setToken(urlToken || "")

//         //   const {query}:any = router
//         //   const urlTokenTwo = query.token
//         //   console.log(urlTokenTwo);
//         //   setToken(urlTokenTwo || "")
        

    },[])
    useEffect(()=>{
            if (token.length > 0) {
                verifyUserEmail()
            }
        },[token])
        
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1 className='text-4xl '> Verify Email </h1>
        <h2 className='p-2 bg-orange-500 text-black'>
            {token ? `${token}`:"no token"}
            
            {verified &&(
                <div>
                    <h2>Verified</h2>
                    <Link href="/login">Login</Link>
                </div>
            )}
            {error &&(
                <div>
                    <h2>Error</h2>
                </div>
            )}
        </h2>

        {/* <button 
        onClick={verifyUserEmail}
        className='p-2 bg-slate-600 '
        > submit</button> */}
      
    </div>
  )
}

 
