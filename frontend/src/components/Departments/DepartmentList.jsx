import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { cols, DepButtons, styles } from '../../utils/DepartmentHelpers'
import axios from 'axios'
import { customStyles } from '../../utils/EmployeeHelper'
function DepartmentList() {
  const [deps,setdeps] = useState([])
  const [filtered,setfiltered] = useState([])
   const ondepDelete = (id) => {
    setfiltered(prevDeps => prevDeps.filter(item => item._id !== id));
  };

  useEffect(()=>{
    const fetchdep = async ()=>{
      try {
        const res = await axios.get('https://employee-management-system-5mci.vercel.app/.vercel.app/api/department')
        console.log(res);

         if(res.data.success) {
          const sno = 1
        const data = await res.data.departments.map((el,idx)=>(
          {
            _id:el._id,
            sno : idx+1,
            dep_name  : el.dep_name,
              action : (<DepButtons _id = {el._id} ondepDelete = {ondepDelete}/>)
          }
        ))
        setdeps(data)
        setfiltered(data)
      }
      } catch (error) {
        alert('error')
        console.log(error);
        
      }
    }
    fetchdep();
  }, [])
  const filterDep = (e)=>{
    const records = deps.filter((dep)=>
      dep.dep_name.includes(e.target.value)
    )
    setfiltered(records)
  }
  return (
    <div className='p-5'>
          <div className='text-center text-2xl font-bold'>
            <h3>Manage Departments</h3>
          </div>

          <div className='flex justify-between items-center'>
            <input type="text" onChange={filterDep} placeholder='Search By Dep Name' className='px-5 py-0.5 border rounded mr-5 md:mr-0'/>
            <Link to = '/admin_dash/addDep' className='px-4 py-2 ml-5 md:ml-0 bg-teal-600 rounded text-white cursor-pointer transition-all active:scale-95 duration-100'>Add New Department</Link>
          </div>
          <div className='mt-5'>
            <DataTable
           columns={cols} 
           data = {filtered}
           customStyles={customStyles}
           pagination
           responsive
            />
          </div>
        </div>
  )
}

export default DepartmentList
