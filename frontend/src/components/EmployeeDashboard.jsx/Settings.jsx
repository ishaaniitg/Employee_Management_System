import { useAuth } from '../../context/AuthContext'
import React, { Suspense, useState } from 'react' 
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Settings() {
    const navigate = useNavigate()
    const user  = useAuth()
    const [setting,setsetting] = useState({
        userId:user.user._id,
        oldPassword:'',
        newPassword:'',
        confirmPassword:''
    })
    const [error,seterror] = useState(null)
    const handleChange = (e)=>{
        const {name,value} = e.target;
        setsetting({...setting,[name]:value})
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(setting.newPassword !== setting.confirmPassword){
            seterror('Password do not match')
        } else {

            try{
                const res = await axios.put('https://employeemanagementsystem-rust.vercel.app/api/settings/change-pass',setting)
                
            
         if(res.data.success) {
            seterror('')
            seterror('Password changed')
       }
      } catch (error) {
        seterror('server error')
        alert('error')
        console.log(error);
      }
        }
    }
  return (
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
      <div>
         <h2 className='text-2xl font-bold mb-6'>Change Password</h2>
         <form action="" onSubmit={handleSubmit}>

          <div>
            <h2 className='text-red-500'>{error}</h2>
            <label className='text-sm font-medium text-gray-700' htmlFor="dep_name">Old Password</label>
            <input type="password" name='oldPassword' placeholder='Change Password'
            required
            onChange={handleChange}
            className='mt-1 w-full p-2 border border-gray-300 rounded-md'
             />
          </div>

           <div>
            <label className='text-sm font-medium text-gray-700' htmlFor="dep_name">New Password</label>
            <input type="password" name='newPassword' placeholder='New Password'
            required
            onChange={handleChange}
            className='mt-1 w-full p-2 border border-gray-300 rounded-md'
             />
          </div>

          <div>
            <label className='text-sm font-medium text-gray-700' htmlFor="dep_name">Confirm Password</label>
            <input type="password" name='confirmPassword' placeholder='Confirm Password'
            required
            onChange={handleChange}
            className='mt-1 w-full p-2 border border-gray-300 rounded-md'
             />
          </div>

        

          
          <button type='submit' className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold  py-2 px-4 cursor-pointer transition-all active:scale-95 duration-100'>Change password</button>
        </form>
      </div>
    </div>
  )
}

export default Settings
