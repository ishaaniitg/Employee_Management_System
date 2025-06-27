import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { cols, LeaveButtons } from '../../utils/LeaveHelper'
import DataTable from 'react-data-table-component'
import { customStyles } from '../../utils/EmployeeHelper'
function Table() {
  const [leaves,setleaves] = useState([])
  const [filtered,setfiltered] = useState([])
    const fetchleaves  = async ()=>{
        try {
        const res = await axios.get('https://employee-management-system-e8fx.vercel.app/api/leave')
        console.log(res);

         if(res.data.success) {         
        const data = await res.data.leaves.map((el,idx)=>(
          {
            _id:el._id,
            sno : idx+1,
            employeeId:el.employeeId,
            name:el.name,
            leaveType:el.leaveType,
             department:el.department,
              days: Math.ceil(
  (new Date(el.to) - new Date(el.from)) / (1000 * 60 * 60 * 24)
) + 1,
             status:el.status,
             action : (<LeaveButtons id = {el._id}/>)
          }
        ))
        setleaves(data)
        setfiltered(data)
      }
      } catch (error) {
        alert('error')
        console.log(error);
      }  
    }
    useEffect(()=>{
      fetchleaves()
    },[])
    const searchbyFilter = (e)=>{
      const data = leaves.filter((el) => el.employeeId.includes(e.target.value))
      setfiltered(data)
    }
    const filterbyButton = (status)=>{
     const data = leaves.filter((el) => el.status.includes(status))
      setfiltered(data)
    }
  return (
    <div className='p-6'>

      <div className='text-center '>
            <h3 className='text-2xl font-bold'>Manage Leaves</h3>
            </div>

          <div className='flex justify-between items-center'>
            <input type="text" placeholder='Search By Employee Id' onChange={searchbyFilter}   className="border border-gray-300 rounded-md px-4 py-2 "
            />
            <div className='space-x-3'>
           <button className='px-4 py-2 bg-teal-600 rounded-xl text-white cursor-pointer transition-all active:scale-95 duration-100 ' onClick={()=>{filterbyButton('Pending')}}>Pending</button>
           <button className='px-4 py-2 bg-teal-600 rounded-xl text-white cursor-pointer transition-all active:scale-95 duration-100' onClick={()=>{filterbyButton('Approved')}}>Approved</button>
           <button className='px-4 py-2 bg-teal-600 rounded-xl text-white cursor-pointer transition-all active:scale-95 duration-100' onClick={()=>{filterbyButton('Rejected')}}>Rejected</button>
           </div>
     </div>
     <div className='mt-5'>
     <DataTable responsive  customStyles={customStyles} columns={cols} data ={filtered} pagination/>
     </div>
     </div>
  )
}

export default Table
