import React, { useEffect, useState } from 'react'
import SummCard from './SummCard'
import { FaBuilding, FaCalendarAlt, FaCheckCircle, FaCogs, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTachometerAlt, FaTimesCircle, FaUsers } from "react-icons/fa";
import axios from 'axios'
function AdminSummary() {
  const [summary,setsummary] = useState(null)

  useEffect(()=>{
    const fetchsumm = async ()=>{
      try {
        const summ = await axios.get('https://employeemanagementsystem-rust.vercel.app/api/dashboard/summary')
        setsummary(summ.data)
        console.log(summ.data);
        
      }  catch (error) {
        alert('error : ', error)
        console.log(error);
        
      }
    }
    fetchsumm()
  },[])
  return (

    <div className='p-6'>
      <h3 className='text-2xl font-bold'>Dashboard Overview</h3>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
        <SummCard icon = {<FaUsers/>} text = {'Total Employees'} number ={summary ? summary.totalEmp : ''} color='bg-teal-600'/>
        <SummCard icon = {<FaBuilding/>} text = {'Total Departments'} number ={summary ? summary.totalDeps : ''} color='bg-yellow-600'/>
         <SummCard icon = {<FaMoneyBillWave/>} text = {'Monthly Salary'} number ={summary ? summary.totalSalary : ''} color='bg-red-600'/>  
      </div>

      <div className='mt-12'>
        <h4 className='text-center text-2xl font-bold'>Leave Details</h4>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
            <SummCard icon = {<FaFileAlt/>} text = {'Leave Applied'} number ={summary ? summary.leaveSumm.approved + summary.leaveSumm.pending +  summary.leaveSumm.rejected  : ''} color='bg-teal-600'/>
            <SummCard icon = {<FaCheckCircle/>} text = {'Leave Approved'} number ={summary ? summary.leaveSumm.approved : ''} color='bg-green-600'/>
            <SummCard icon = {<FaHourglassHalf/>} text = {'Leave Pending'} number ={summary ? summary.leaveSumm.pending : ''} color='bg-yellow-600'/>
            <SummCard icon = {<FaTimesCircle/>} text = {'Leave Rejected'} number ={summary ? summary.leaveSumm.rejected : ''} color='bg-red-600'/>
        </div>
      </div>

    </div>
  )
}

export default AdminSummary
