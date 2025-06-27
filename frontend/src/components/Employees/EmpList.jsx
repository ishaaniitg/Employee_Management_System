import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { cols, customStyles, EmpButtons } from '../../utils/EmployeeHelper'
import DataTable from 'react-data-table-component'

function EmpList() {
  const[emp,setemp] = useState([])
  const [filtered,setfiltered] = useState([])
  
  useEffect(()=>{
    const fetchemployees = async ()=>{
      try {
        const res = await axios.get('https://employee-management-system-5mci.vercel.app/.vercel.app/api/employee')
        console.log(res);

         if(res.data.success) {         
        const data = await res.data.employees.map((el,idx)=>(
          {
            _id:el._id,
            sno : idx+1,
            department:el.department,
            name:el.name,
            dob: new Date(el.dob).toDateString(),
             action : (<EmpButtons id = {el._id}/>)
          }
        ))
        setemp(data)
        setfiltered(data)
      }
      } catch (error) {
        alert('error')
        console.log(error);
      }
    }
   fetchemployees()
    
  }, [])
  const handleFilter = (e)=>{
    const records = emp.filter((emp)=>
      emp.name.includes(e.target.value)
    )
    setfiltered(records)
  }
  return (
    <div>
      <div className='text-center text-2xl font-semibold'>
            <h3>Manage Employee</h3>
          </div>

          <div className='flex justify-between items-center p-5 '>
            <input type="text" placeholder='Search By Emp Name' className='px-5 py-0.5 border rounded '
            onChange={handleFilter}/>
            <Link to = '/admin_dash/add_employee' className='px-4 py-2 bg-teal-600 rounded text-white cursor-pointer transition-all active:scale-95 duration-100'>Add New Employee</Link>
     </div>
     <div className=' overflow-y-auto md:min-w-full min-h-screen '>
      <DataTable responsive columns={cols} data={filtered} customStyles={customStyles} pagination/> 
     </div>
    </div>
  )
}

export default EmpList
