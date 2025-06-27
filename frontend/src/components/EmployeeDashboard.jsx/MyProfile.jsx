import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import {useAuth} from '../../context/AuthContext'
function MyProfile() {
  const id = useParams()
    const [employee,setemployee] = useState({})

     useEffect(()=>{
      
    const fetchempl = async ()=>{
      try {
        
        const res = await axios.get(`https://employee-management-system-5mci.vercel.app/.vercel.app/api/employee/user/${id.id}`)
        console.log(res);

         if(res.data.success) {
         setemployee(res.data.newEmp[0]);
         console.log(res.data.newEmp);
      }
      } catch (error) {
        alert('error')
        console.log(error);
      }
    }
    fetchempl();
  }, [])

  return (
    <div className='max-w-3xl mx-auto mt-10  bg-white p-8 rounded-md shadow-md'>
        <h2 className='text-2xl font-bold mb-8 text-center'>Employee details</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
            <div className='flex space-x-3 mb-5'>
            <p className='text-lg font-bold'>Name:</p>
            <p className='font-medium'>{employee.name}</p>
            </div>

            <div className='flex space-x-3 mb-5'>
            <p className='text-lg font-bold'>Employee ID:</p>
            <p className='font-medium'>{employee.employeeId}</p>
            </div>

            <div className='flex space-x-3 mb-5'>
            <p className='text-lg font-bold'>Date of Birth:</p>
            <p className='font-medium'>{new Date(employee.dob).toDateString()}</p>
            </div>

            <div className='flex space-x-3 mb-5'>
            <p className='text-lg font-bold'>Gender:</p>
            <p className='font-medium'>{employee.gender}</p>
            </div>

            <div className='flex space-x-3 mb-5'>
            <p className='text-lg font-bold'>Department:</p>
            <p className='font-medium'>{employee.department}</p>
            </div>

            <div className='flex space-x-3 mb-5'>
            <p className='text-lg font-bold'>Marital Status:</p>
            <p className='font-medium'>{employee.maritalStatus}</p>
            </div>



        </div>
      </div>
    </div>
  )
}
export default MyProfile
