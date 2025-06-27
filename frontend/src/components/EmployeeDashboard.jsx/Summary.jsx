import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'
import { EmpWelcome } from '../../utils/EmployeeHelper'
function Summary() {
    const user = useAuth()
    const [username,setusername] = useState('')
    useEffect(()=>{
      const myfunc = async ()=>{
        console.log('userid recieved is ', user.user._id);
        
        const data =  await EmpWelcome(user.user._id)
        setusername(data)
    }
    myfunc()
    },[])
  return (
     <div className='rounded  flex bg-white p-6'>
      <div className={`text-3xl flex bg-teal-600 justify-center items-center  text-white px-4`}>
        <FaUser/>
      </div>

      <div className='pl-4 py-1'>
        <p className='text-lg font-semibold'>Welcome Back,</p>
        <p className='text-lg font-bold'>{username}</p>
      </div>

    </div>
  )
}

export default Summary
