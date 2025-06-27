import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillWave, FaTachometerAlt, FaUsers } from "react-icons/fa";
import { useAuth } from '../../context/AuthContext';
function EmpSidebar() {

  const user = useAuth()

  return (
     <div className='bg-gray-800 text-white h-screen left-0 top-0 bottom-0 space-y-2 w-64'>
     <div className='bg-teal-600 min-h-12 flex items-center justify-center'>
      <h3 className='text-2xl text-center '>Employee MS</h3>
     </div>

     <div className='text-lg'>
      <NavLink to = '/employee_dash'
       className={({isActive}) => `${isActive ? "bg-teal-500" : " "}  flex items-center space-x-4 py-2.5 px-4 rounded`} end > 
        <FaTachometerAlt />
        <span>Dashboard</span>
      </NavLink>

      <NavLink to = {`/employee_dash/profile/${user.user._id}`}  className={({isActive}) => `${isActive ? "bg-teal-500" : " "}  flex items-center space-x-4 py-2.5 px-4 rounded`} >
        <FaUsers/>
        <span>My Profile</span>
      </NavLink>

      <NavLink to = '/employee_dash/leaves'  className={({isActive}) => `${isActive ? "bg-teal-500" : " "}  flex items-center space-x-4 py-2.5 px-4 rounded`}>
        <FaBuilding/>
        <span>Leaves</span>
      </NavLink>

      <NavLink to = {`/employee_dash/salary/${user.user._id}`} className={({isActive}) => `${isActive ? "bg-teal-500" : " "}  flex items-center space-x-4 py-2.5 px-4 rounded`} >
        <FaCalendarAlt/>
        <span>Salary</span>
      </NavLink>


      <NavLink to = '/employee_dash/settings' className={({isActive}) => `${isActive ? "bg-teal-500" : " "}  flex items-center space-x-4 py-2.5 px-4 rounded`} >
        <FaCogs/>
        <span>Settings</span>
      </NavLink>
     </div>

    </div>
  )
}

export default EmpSidebar
