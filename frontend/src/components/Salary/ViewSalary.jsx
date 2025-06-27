import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
function ViewSalary() {
  const [salaries,setsalaries] = useState([])
  const {id} = useParams()

  const fetchsalary = async () =>{
    try{
      const res = await axios.get(`https://employee-management-system-5mci.vercel.app/.vercel.app/api/salary/${id}`)
      console.log(res.data);
      if(res.data.success){
        setsalaries(res.data.salary)
      }
    } catch(error) {
      alert('error')
      console.log(error);
    }
  }
  useEffect(()=>{
    fetchsalary()
  },[])
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Salary History</h2>

      {salaries && salaries.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full text-center border-t border-b border-gray-300">
  <thead className="bg-gray-100 border-b border-gray-300">
    <tr>
      <th className="py-2 px-4">SNO</th>
      <th className="py-2 px-4">EMP ID</th>
      <th className="py-2 px-4">SALARY</th>
      <th className="py-2 px-4">ALLOWANCE</th>
      <th className="py-2 px-4">TOTAL</th>
      <th className="py-2 px-4">PAY DATE</th>
    </tr>
  </thead>
  <tbody>
    {salaries.map((sal, index) => (
      <tr key={sal._id} className="hover:bg-gray-50">
        <td className="py-2 px-4">{index + 1}</td>
        <td className="py-2 px-4">{sal.employeeId.employeeId}</td>
        <td className="py-2 px-4">{sal.basicSalary}</td>
        <td className="py-2 px-4">{sal.allowances}</td>
        <td className="py-2 px-4">
          {Number(sal.basicSalary) + Number(sal.allowances)}
        </td>
        <td className="py-2 px-4">{new Date(sal.payDate).toLocaleDateString()}</td>
      </tr>
    ))}
  </tbody>
</table>

        </div>
      ) : (
        <div className="w-full text-center text-xl font-semibold">No records to display</div>
      )}
    </div>
  )
}

export default ViewSalary


