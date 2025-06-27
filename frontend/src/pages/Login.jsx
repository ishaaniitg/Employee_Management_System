import React, { useCallback, useContext, useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
function Login() {
  const navigate = useNavigate()
  const [email,setemail] =useState('')
  const [pass,setpass] = useState('')
  const [error,seterror] = useState('')
  const {login} = useAuth()
 
  const handleSubmit = async (e)=>{
    e.preventDefault()
    
    try {
      let r = await axios.post('https://employeemanagementsystem-rust.vercel.app/api/auth/login',{email,pass})
       
       if(r.data.success){
        console.log(r);
        
        login(r.data.user)
        localStorage.setItem('token',r.data.token)

        if(r.data.user.role === "admin" ){
          navigate('/admin_dash')
        } else if(r.data.user.role === 'employee') {
          navigate('/employee_dash')
        }

      } else {
       seterror(r.data)
        setemail('')
        setpass('')
      }
    } catch (err){
      console.log('errr occured : ',err);
      
    }
  }
  return (
    <div className='flex flex-col h-screen items-center justify-center space-y-6 bg-gradient-to-b from-yellow-600 from-50% to gray-100 to to-50%'>
      <h2 className='text-3xl text-white font-sans'>Employee Management System</h2>
      <div className='border shadow p-6 w1/4 bg-white'>
      <h2 className='text-2xl font-bold mb-4'>Login</h2>
      {error && <p className='text-red-500'>{error}</p>}
      <form action="" onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label htmlFor="email" className='block text-gray-700'>Email</label>
          <input required onChange={(e)=>{setemail(e.target.value)}} value={email} type="email" name="email" placeholder='Enter Email' className='border w-full px-3 py-2' />
        </div>

        <div className='mb-4'>
          <label htmlFor="password" className='block text-gray-700'>Password</label>
          <input required onChange={(e)=>{setpass(e.target.value)}} value={pass} className='border w-full px-3 py-2' type="password" name="password" placeholder='Enter password' />
        </div>

        <div className='mb-4 flex items-center justify-center gap-x-5'>
          <label htmlFor="" className='inline-flex items-center'>
            <input type="checkbox" className='form-checkbox' id='tick' />
            <label htmlFor='tick' className='ml-2 text-gray-700 transition-all cursor-pointer'>Remember me</label>
          </label>

          <a href="#" className='text-teal-600 transition-all'>Forgot password?</a>

        </div>

       <div className='mb-4'>
         <button type="submit" className='w-full bg-teal-600 text-white py-2 cursor-pointer transition-all active:scale-95 duration-100 hover:bg-green-500'>Login</button>
        </div>

      </form>
      </div>
    </div>
  )
}

export default Login
