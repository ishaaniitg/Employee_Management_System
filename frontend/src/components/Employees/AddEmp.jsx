import React, { useEffect, useState } from 'react'
import { fetchdep } from '../../utils/EmployeeHelper'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function AddEmp() {
     const [dep,setdep] = useState([])
     const navigate = useNavigate()

     const [formdata,setdformdata] = useState({})

  useEffect(()=>{
    const getdep = async ()=>{
       const deps = await fetchdep() 
       setdep(deps)
    }
    getdep()
  }
  ,[])

  const handleChange = (e)=>{
     const {name,value} = e.target;
     setdformdata({...formdata,[name]:value})
      }

      const submitHandler = async (e)=>{
        e.preventDefault();
         try{
      const res = await axios.post('https://employee-management-system-5mci.vercel.app/.vercel.app/api/employee/add',formdata)
      if(res.data.success) {
        navigate('/admin_dash/employees')
        console.log(res);
      }
    } catch (error)  {
      console.log(error);
      
      alert('error occured')
    }
      }
  return (
   <>
      <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-4xl">
        <h2 className="text-2xl font-bold mb-6">Add New Employee</h2>
        <form  onSubmit={submitHandler} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1">Name</label>
            <input type="text" name="name" 
            onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md" placeholder="Insert Name" />
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <input type="email" name="email"
              className="w-full border px-4 py-2 rounded-md" placeholder="Insert Email" onChange={handleChange}/>
          </div>

          <div>
            <label className="block mb-1">Employee ID</label>
            <input type="text" name="employeeId" 
            onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md" placeholder="Employee ID" />
          </div>

          <div>
            <label className="block mb-1">Date of Birth</label>
            <input type="date" name="dob" 
            onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md" />
          </div>

          <div>
            <label className="block mb-1">Gender</label>
            <select name="gender"
            onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Marital Status</label>
            <select name="maritalStatus" 
            onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md">
              <option value="">Select Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Designation</label>
            <input type="text" name="designation" onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md" placeholder="Designation" />
          </div>

          <div>
            <label className="block mb-1">Department</label>
            <select name="department" onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md">
              <option value="">Select Department</option>
              {dep.map((dep)=>{
               return  <option key={dep._id} value={dep.dep_name}>{dep.dep_name}</option>
              })}
            </select>
          </div>

          <div>
            <label className="block mb-1">Salary</label>
            <input type="number" name="salary"  onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md" placeholder="Salary" />
          </div>

          <div>
            <label className="block mb-1">Password</label>
            <input type="password" name="password" 
            onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md" placeholder="******" />
          </div>
           <button type='submit' className='w-210 mx-auto mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold  py-2 px-4 cursor-pointer transition-all active:scale-95 duration-100'>Add Employee</button>
        </form>
      </div>
    </>
  )
}

export default AddEmp
