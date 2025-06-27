import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function EditDepartment() {
  const {id} = useParams()
    const [depname, setdepname] = useState('');
  const [desc, setdesc] = useState('');
  const navigate = useNavigate()

  useEffect(()=>{

    const fetchdep = async ()=>{
      try {
        const res = await axios.get(`https://employee-management-system-5mci.vercel.app/.vercel.app/api/department/${id}`)
        console.log(res);

         if(res.data.success) {
         const dept = res.data.department[0];
          setdepname(dept.dep_name);
          setdesc(dept.description);
      }
      } catch (error) {
        alert('error')
        console.log(error);
      }
    }
    fetchdep();
  }, [])

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try{
      const res = await axios.put(`https://employee-management-system-5mci.vercel.app/.vercel.app/api/department/${id}` ,{depname,desc})
      if(res.data.success) {
        navigate('/admin_dash/departments')
        console.log(res);
      }
    } catch (error)  {
      console.log(error);
      
      alert('error occured')
    }
  }
  return (
     <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
      <div>
        <h2 className='text-2xl font-bold mb-6'>Edit Department</h2>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <label className='text-sm font-medium text-gray-700' htmlFor="dep_name">Department Name</label>
            <input type="text" name='dep_name' placeholder='Department Name'
            required
            value={depname}
             onChange={(e) => setdepname(e.target.value)}
            className='mt-1 w-full p-2 border border-gray-300 rounded-md'
             />
        
          </div>

          <div  className='mt-3'>
            <label htmlFor="description" className='block text-sm font-medium text-gray-700'>Description</label>
            <textarea 
            value={desc}
            onChange={(e) => setdesc(e.target.value)}
             name="description" placeholder='description' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' rows='4'></textarea>
          </div>
          <button type='submit' className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold  py-2 px-4 cursor-pointer transition-all active:scale-95 duration-100'>Edit department</button>
        </form>
      </div>
    </div>
  )
}

export default EditDepartment
