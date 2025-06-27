import React, { useState } from 'react'
import {useAuth} from '../../context/AuthContext'
import {useNavigate} from 'react-router-dom'
import { EmpWelcome } from '../../utils/EmployeeHelper'
import { useEffect } from 'react'
function Navbar() {
  const navigate = useNavigate()
  const {user,logout} = useAuth()

  const [username,setusername] = useState('')

  const handleLogout = ()=>{
    logout
    navigate('/login')
  }

  useEffect(()=>{
    if(user.role !== 'admin') {
        const myfunc = async ()=>{
          console.log('from navbar', user._id);
          
          const data =  await EmpWelcome(user._id)
          setusername(data)
      }
      myfunc()
    } else {
      setusername('Admin')
    }
      },[])
  return (
    <div className='flex justify-between items-center text-white min-h-12 text-lg bg-teal-600 px-5'>
      <p>Welcome , {username}</p>
      <button className='px-4 py-1 bg-teal-700 hover:bg-teal-800 cursor-pointer transition-all rounded-lg active:scale-95 duration-100' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Navbar
