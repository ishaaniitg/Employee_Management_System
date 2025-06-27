import React from 'react'
import EmpSidebar from '../components/EmployeeDashboard.jsx/EmpSidebar'
import {Outlet} from 'react-router-dom'
import Navbar from '../components/Dashboard/Navbar'
function EmployeeDash() {
  return (
    <div>
      <div className='flex'>
      <EmpSidebar/>
      <div className='flex-1 bg-gray-100 h-screen'>
        <Navbar/>
        <Outlet/> 
      </div>
    </div>
    </div>
  )
}

export default EmployeeDash
