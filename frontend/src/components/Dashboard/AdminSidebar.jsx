import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillWave, FaTachometerAlt, FaUsers } from "react-icons/fa";
function AdminSidebar() {
  return (
     <div className='bg-gray-800 text-white h-screen left-0 top-0 bottom-0 space-y-2 w-64'>
     <div className='bg-teal-600 min-h-12 flex items-center justify-center'>
      <h3 className='text-2xl text-center '>Employee MS</h3>
     </div>

     <div className='text-lg'>
      <NavLink to = '/admin_dash'
       className={({isActive}) => `${isActive ? "bg-teal-500" : " "}  flex items-center space-x-4 py-2.5 px-4 rounded`} end > 
        <FaTachometerAlt />
        <span>Dashboard</span>
      </NavLink>

      <NavLink to = '/admin_dash/employees'  className={({isActive}) => `${isActive ? "bg-teal-500" : " "}  flex items-center space-x-4 py-2.5 px-4 rounded`} >
        <FaUsers/>
        <span>Employees</span>
      </NavLink>

      <NavLink to = '/admin_dash/departments'  className={({isActive}) => `${isActive ? "bg-teal-500" : " "}  flex items-center space-x-4 py-2.5 px-4 rounded`}>
        <FaBuilding/>
        <span>Departments</span>
      </NavLink>

      <NavLink to = '/admin_dash/leaves' className={({isActive}) => `${isActive ? "bg-teal-500" : " "}  flex items-center space-x-4 py-2.5 px-4 rounded`} >
        <FaCalendarAlt/>
        <span>Leave</span>
      </NavLink>

      <NavLink to = '/admin_dash/salary'  className={({isActive}) => `${isActive ? "bg-teal-500" : " "}  flex items-center space-x-4 py-2.5 px-4 rounded`} >
        <FaMoneyBillWave/>
        <span>Salary</span>
      </NavLink>

      <NavLink to = '/admin_dash/settings' className={({isActive}) => `${isActive ? "bg-teal-500" : " "}  flex items-center space-x-4 py-2.5 px-4 rounded`} >
        <FaCogs/>
        <span>Settings</span>
      </NavLink>
     </div>

    </div>
  )
}

export default AdminSidebar
