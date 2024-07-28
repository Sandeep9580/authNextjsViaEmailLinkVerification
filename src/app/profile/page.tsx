'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

function profilepage() {
    const router =useRouter()
   const [data,setData] = useState("Nothing")

    const getUsserDetail = async()=>{
      try {
         const res= await axios.post("/api/users/me")
         console.log(res.data.data);
         setData(res.data.data._id)
      } catch (error:any) {
          toast.error(error.message)
      }
    }
      const logout=async()=>{
         try {
            await axios.get("/api/users/logout")
            toast.success("Logout Successful")
            router.push("/login")
         } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
         }
      }

    
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-4xl '>Profile page</h1>
      <hr />
      <h2>{data==="nothig"? "Nothing" :<Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <hr />
      <button
      className='bg-blue-600 mt-3 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded'
      onClick={logout}
      >logout</button>
      <hr />
      <button
      className='bg-blue-600 mt-3 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded'
      onClick={getUsserDetail}
      >Get Detail</button>
    </div>
  )
}

export default profilepage
