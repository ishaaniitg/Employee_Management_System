import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import {useAuth} from '../../context/AuthContext'
import { useEffect } from 'react'
function List() {
  const {user} = useAuth()
  const [leaves,setleaves] = useState([])

  const {id} = useParams()
  
    const id1 = user.role === 'admin' ? id : user._id
    
  const fetchleaves = async () =>{
    try{
      const res = await axios.get(`http://localhost:3000/api/leave/${id1}`)
      console.log(res.data);

      if(res.data.success){
        setleaves (res.data.leaves)
      }

    } catch(error) {
      alert('error')
      console.log(error);
    }
  }
  useEffect(()=>{
    fetchleaves()
  },[])
  return (
     <div className='p-6'>
      <div className='text-center text-2xl font-bold'>
            <h3>Manage Leaves</h3>
          </div>

          <div className='flex justify-between items-center p-5'>
            {/* <input type="text" placeholder='Search By Leave Type' className='px-5 py-1 border-gray-300 border rounded '
            /> */}
            <div className='px-5 py-1  rounded'></div>
            {user.role === 'employee' && 
            <Link to = '/employee_dash/add_leave' className='px-4 py-2 bg-teal-600 rounded text-white cursor-pointer transition-all active:scale-95 duration-100'>Add New Leave </Link>
}
     </div>
     
     <table className="min-w-full text-center border-t border-b border-gray-300">
  <thead className="bg-gray-100 border-b border-gray-300">
    <tr>
      <th className="py-2 px-4">SNO</th>
      <th className="py-2 px-4">LEAVE TYPE</th>
      <th className="py-2 px-4">FROM</th>
      <th className="py-2 px-4">TO</th>
      <th className="py-2 px-4">REASON</th>
      <th className="py-2 px-4">STATUS</th>
    </tr>
  </thead>
  <tbody>
    {leaves && leaves.length > 0 && leaves.map((sal, index) => (
      <tr key={sal._id} className="hover:bg-gray-50">
        <td className="py-2 px-4">{index + 1}</td>
        <td className="py-2 px-4">{sal.leaveType}</td>
        <td className="py-2 px-4">{new Date(sal.StartDate).toLocaleDateString()}</td>
        <td className="py-2 px-4">{new Date(sal.EndDate).toLocaleDateString()}</td>
        <td className="py-2 px-4">{sal.reason}</td>
        <td className="py-2 px-4">{sal.status}</td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  )
}

export default List
