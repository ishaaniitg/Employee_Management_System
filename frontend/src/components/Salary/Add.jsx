import React, { useEffect, useState } from 'react'
import { fetchdep, getemployees } from '../../utils/EmployeeHelper'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
function Add() {
  const [salary,setsalary] = useState({
    employeeId:'',
    basicSalary:'',
    allowances:'',
    payDate:''
  })
     const [employee,setemployee] = useState([])
     const [dep,setdep] = useState([]) // 'dep' state
     const [loading, setLoading] = useState(true);

     const navigate = useNavigate()

     const {id} = useParams()

     const handleDept =  async (e)=>{ // as soon as dept is fixed it fetches all employess based on that dept
      console.log('dept changed , lets call emps : ');
      
      const emps = await getemployees(e.target.value)
      console.log('emps returned back are ' , emps);
      
      setemployee(emps)
     }


  useEffect(()=>{ // fetch all employees initially 
    const fetchempl = async ()=>{
      try {
        const res = await axios.get(`https://employee-management-system-e8fx.vercel.app/api/employee`)
        console.log(res);

         if(res.data.success) {
            const emps = res.data.employee
        setemployee(emps)
       }
      } catch (error) {
        alert('errror')
        console.log(error);
      }
      setLoading(false);
    }
    fetchempl();
  }
  ,[])

  useEffect(()=>{ // fetch all deps from utils function and store in 'dep'
      const getdep = async ()=>{
         const deps = await fetchdep() 
         setdep(deps) 
      }
      getdep()
    }
    ,[])

  const handleChange = (e)=>{ // sets input value in 'salary' state
     const {name,value} = e.target;
     setsalary((prev)=> ({...prev,[name]:value}) )
      }

     const submitHandler = async (e)=>{ // send all the form data 'emps' state to backend
        e.preventDefault();
         try{
      const res = await axios.post(`https://employee-management-system-e8fx.vercel.app/api/salary/add`,salary)
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
   {loading ? <div className="text-center mt-10 text-gray-500">Loading Salary data...</div> :
      <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-4xl">
        <h2 className="text-2xl font-bold mb-6">Add Salary</h2>

        <form onSubmit={submitHandler}  className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className=''>
            <label className="block mb-1">Department</label>
            <select name="department" onChange={handleDept}
              className="w-full border px-4 py-2 rounded-md ">
              <option value="">Select Department</option>
              {dep.map((dep)=>{
               return  <option key={dep._id} value={dep.dep_name}>{dep.dep_name}</option>
              })}
            </select>
          </div>


          <div className=''>
            <label className="block mb-1">Employee</label>
            <select name="employeeId" onChange={handleChange}
            required
              className="w-full border  px-4 py-2 rounded-md">
              <option value="">Select Employee</option>
              { employee !== undefined && employee.map((emp)=>{
                
               return  <option key={emp._id} value={emp._id}>{emp.employeeId}</option>
              })}
            </select>
          </div>


          <div>
            <label className="md:block mb-1">Basic Salary</label>
            <input type="number" name="basicSalary" onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md" placeholder="basicSalary" required />
          </div>

          <div>
            <label className="block mb-1 ">Pay Date</label>
            <input type="date" name="payDate"  onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md"/>  
          </div>

          <div className='col-span-2'>
            <label className="block mb-1 ">Allowances</label>
            <input type="number" name="allowances"  onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md" placeholder="allowances" />  
          </div>
    


           <button type='submit' className='w-210 mx-auto mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold  py-2 px-4 cursor-pointer transition-all active:scale-95 duration-100'>Add Salary</button>
        </form>

       


      </div>
}
    </>
  )
}

export default  Add
