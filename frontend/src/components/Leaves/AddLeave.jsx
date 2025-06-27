import React, { useState } from 'react'
import {useAuth} from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
function AddLeave() {
   const user = useAuth()
   const navigate = useNavigate()
    const [leave,setleave] = useState({
      userId:user.user._id,
    })
    useEffect(()=>{
      console.log(user.user._id);
    },[])

    const handleChange = (e)=>{
        const {name,value} = e.target
        setleave((prev)=>({...prev,[name]:value}))
    }
    const handleSubmit = async (e)=>{
        e.preventDefault()
         try {
        
        const res = await axios.post(`https://employee-management-system-5mci.vercel.app/.vercel.app/api/leave/add`,leave)
        console.log(res);

         if(res.data.success) {
         navigate('/employee_dash/leaves')
         
      }
      } catch (error) {
        alert('error')
        console.log(error);
      }
    }
  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
  <h2 className="text-2xl font-bold mb-6">Request for Leave</h2>

  <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
    
    {/* Leave Type */}
    <div className="flex flex-col space-y-2">
      <label className="block mb-1 font-medium">Leave Type</label>
      <select
        name="leaveType"
        onChange={handleChange}
        className="border p-2 border-gray-300 rounded-md"
        required
      >
        <option value="">Select Department</option>
        <option value="Sick Leave">Sick Leave</option>
        <option value="Casual Leave">Casual Leave</option>
        <option value="Annual Leave">Annual Leave</option>
      </select>
    </div>

    {/* Dates side by side */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">From Date</label>
        <input
          type="date"
          name="StartDate"
          onChange={handleChange}
          className="border p-2 mt-1 block border-gray-300 rounded-md w-full"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">To Date</label>
        <input
          type="date"
          name="EndDate"
          onChange={handleChange}
          className="border p-2 mt-1 block border-gray-300 rounded-md w-full"
          required
        />
      </div>
    </div>

    {/* Description full width */}
    <div className="mt-2">
      <label className="block text-sm  font-medium text-gray-700 mb-1">Description</label>
      <textarea
        name="reason"
        placeholder="Reason"
        onChange={handleChange}
        className="w-full border p-2 border-gray-300 rounded-md min-h-40 md:min-h-25" 
        required
      />
    </div>

    {/* Submit button */}
    <div className="flex justify-center mt-4">
      <button
        type="submit"
        className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-md transition-all active:scale-95 duration-100"
      >
        Add Leave
      </button>
    </div>
  </form>
</div>

  )
}

export default AddLeave
