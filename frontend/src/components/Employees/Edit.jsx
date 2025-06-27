import React, { useEffect, useState } from 'react'
import { fetchdep } from '../../utils/EmployeeHelper'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
function Edit() {
     const [employee,setemployee] = useState({})

     const [loading, setLoading] = useState(true);
     const [dep,setdep] = useState([])

     const navigate = useNavigate()
     const {id} = useParams()

  useEffect(()=>{
    const fetchempl = async ()=>{
      try {
        const res = await axios.get(`https://employeemanagementsystem-rust.vercel.app/api/employee/${id}`)
        console.log(res);

         if(res.data.success) {
            const emps = res.data.employee
        setemployee(emps)
       }
      } catch (error) {
        alert('error')
        console.log(error);
      }
      setLoading(false);
    }
    fetchempl();
  }
  ,[])

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
     setemployee({...employee,[name]:value})
      }
      const submitHandler = async (e)=>{
        e.preventDefault();
         try{
      const res = await axios.put(`https://employeemanagementsystem-rust.vercel.app/api/employee/${id}`,employee)
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
   {loading ? <div className="text-center mt-10 text-gray-500">Loading employee data...</div> :
      <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-4xl">
        <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>
        <form onSubmit={submitHandler}  className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1">Name</label>
            <input type="text" name="name" 
            onChange={handleChange}
            value={employee.name}
              className="w-full border px-4 py-2 rounded-md" placeholder="Insert Name" />
          </div>

          <div>
            <label className="block mb-1">Marital Status</label>
            <select name="maritalStatus"
            value={employee.maritalStatus} 
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
            value={employee.designation}
              className="w-full border px-4 py-2 rounded-md" placeholder="Designation" />
          </div>

          <div>
            <label className="block mb-1">Salary</label>
            <input type="number" name="Salary"  onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md" placeholder="Salary" value={employee.Salary}/>  
          </div>

          <div className='col-span-2 '>
            <label className="block mb-1">Department</label>
            <select name="department" onChange={handleChange}
            value={employee.department}
              className="w-full border px-4 py-2 rounded-md">
              <option value="">Select Department</option>
              {dep.map((dep)=>{
               return  <option key={dep._id} value={dep.dep_name}>{dep.dep_name}</option>
              })}
            </select>
          </div>


           <button type='submit' className='w-210 mx-auto mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold  py-2 px-4 cursor-pointer transition-all active:scale-95 duration-100'>Edit Employee</button>
        </form>
      </div>
}
    </>
  )
}

export default Edit
