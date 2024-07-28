'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function signUppage() {

    const router = useRouter()
   
    const [user,setUser]=useState({
        email:"",
        password:"",
        username:""
    })

    const [buttonDisable,setButtonDisable]=useState(false)
    const[loading,setLoading]=useState(false)

    const onSignup = async () =>{
        try {
            setLoading(true)
           const response= await axios.post("/api/users/signup",user)
           console.log("Signup Successful",response.data);
             router.push("/login")
            
            
        } catch (error:any) {
            console.log("Error",error)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
       if (user.email.length>0 && user.password.length>0 && user.username.length>0) {
         setButtonDisable(false)
       }else{
          setButtonDisable(true)
       }
    },[user])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading?"processing...":"Signup"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input 
      className='p-2 border-gray-400 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black '
      id='username'
      value={user.username}
      placeholder='username'
      onChange={e=>setUser({...user, username:e.target.value})}
      type="text"/>

      <label htmlFor="username">Email</label>
      <input 
            className='p-2 border-gray-400 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black '
      id='email'
      value={user.email}
      placeholder='email'
      onChange={e=>setUser({...user, email:e.target.value})}
      type="text"/>

      <label htmlFor="username">password</label>
      <input 
            className='p-2 border-gray-400 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black '
      id='password'
      value={user.password}
      placeholder='password'
      onChange={e=>setUser({...user, password:e.target.value})}
      type="text"/>
      <button
      onClick={onSignup}
      className='p-2 border-gray-400 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      >{buttonDisable?"No Signup":"Signup"}</button>
      <Link href={"/login"}> Visit Login Page</Link>
    </div>
  )
}


