import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Details() {
    const navigate = useNavigate()
    const {id} = useParams()
    const [leave,setleave] = useState([])
    
     useEffect(()=>{

    const fetchLeave = async ()=>{
      try {
        console.log(id);
        
        const res = await axios.get(`hhttps://employee-management-system-5mci.vercel.app/.vercel.app/api/leave/details/${id}`)
        console.log(res);

         if(res.data.success) {
            setleave(res.data.leave)
      }
      } catch (error) {
        alert('error')
        console.log(error);
      }
    }
    fetchLeave()
  }, [])
  const changeStatus = async(id,status)=>{
    try {
        console.log(id);
        
        const res = await axios.put(`https://employee-management-system-5mci.vercel.app/.vercel.app/api/leave/${id}`,{status})
        console.log(res);

         if(res.data.success) {
            navigate('/admin_dash/leaves')
      }
      } catch (error) {
        alert('error')
        console.log(error);
      }
  }

  return (
    <div className='max-w-3xl mx-auto mt-10  bg-white p-8 rounded-md shadow-md'>
        <h2 className='text-2xl font-bold mb-8 text-center'>Leave details</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
            <div className='flex space-x-3 mb-5'>
            <p className='text-lg font-bold'>Name:</p>
            <p className='font-medium'>{leave.name}</p>
            </div>

            <div className='flex space-x-3 mb-5'>
            <p className='text-lg font-bold'>Employee ID:</p>
            <p className='font-medium'>{leave.employeeId}</p>
            </div>

            <div className='flex space-x-3 mb-5'>
            <p className='text-lg font-bold'>Leave Type</p>
            <p className='font-medium'>{leave.leaveType}</p>
            </div>

            <div className='flex space-x-3 mb-5'>
            <p className='text-lg font-bold'>Reason</p>
            <p className='font-medium'>{leave.reason}</p>
            </div>

            <div className='flex space-x-3 mb-5'>
            <p className='text-lg font-bold'>Department:</p>
            <p className='font-medium'>{leave.department}</p>
            </div>

            <div className='flex space-x-3 mb-5'>
            <p className='text-lg font-bold'>Start Date</p>
            <p className='font-medium'>{new Date(leave.StartDate).toLocaleDateString()}</p>
            </div>

            <div className='flex space-x-3 mb-5'>
            <p className='text-lg font-bold'>End Date</p>
            <p className='font-medium'>{new Date(leave.EndDate).toLocaleDateString()}</p>
            </div>

            <div className='flex space-x-5 mb-5'>
            <p className='text-lg font-bold'>{leave.status === 'Pending'? 'Action' :  "Status"}</p>
            {leave.status === 'Pending' ?  (
                <div className='flex space-x-5 w-1/2 '>
                <button className=' mx-auto  bg-teal-600 hover:bg-teal-700 text-white font-bold  p-2 cursor-pointer transition-all active:scale-95 duration-100'onClick={()=>changeStatus(leave._id,'Approved')}>Approve</button>
                <button className='mx-auto  bg-red-600 hover:bg-red-700 text-white font-bold  py-2 px-3 cursor-pointer transition-all active:scale-95 duration-100' onClick={()=>changeStatus(leave._id,'Rejected')}>Reject</button>
                 </div>) : <p className='font-medium'>{leave.status}</p>}
            </div>



        </div>
      </div>
    </div>
  )
}

export default Details
