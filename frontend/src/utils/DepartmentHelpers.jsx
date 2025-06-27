import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import axios from "axios"
export const cols = [
    {
        name:" S NO",
        selector : (row) => row.sno
    },
    {
        name:"Department Name",
        selector : (row) => row.dep_name,
        sortable:true
    },
    {
        name:"Action",
        selector : (row) => row.action
    },

]

export const styles = {
  rows: {
    style: {
      fontSize: '16px', // 🆙 Increase font size for rows
    },
  },
  headCells: {
    style: {
      fontSize: '14px', // 🆙 Increase font size for header
      fontWeight: 'bold',
    },
  },
  cells: {
    style: {
      fontSize: '14px', // 🆙 Increase font size for cell content
    },
  },
};

export const DepButtons = ({_id , ondepDelete})=>{
    // const confirm  = window.confirm("Do u want to delete ? ")
    const navigate = useNavigate()

    const handleDelete = async (id)=>{
            try {
        const res = await axios.delete(`https://employeemanagementsystem-rust.vercel.app/api/department/${id}`)
        console.log(res);

         if(res.data.success) {
         ondepDelete(id)
      }
      } catch (error) {
        alert('error')
        console.log(error);
      }
    
    }
    return(
        <div className="flex space-x-3">
            <button className="px-3 py-1 bg-teal-600 text-white cursor-pointer rounded-lg duration-100 transition-all active:scale-95" onClick={()=>{navigate(`/admin_dash/departments/${_id}`)}}>
                Edit</button>

            <button className="px-3 py-1 bg-red-600 text-white cursor-pointer rounded-lg  duration-100 transition-all active:scale-95"
            onClick={()=>{handleDelete(_id)}}
            >Delete</button>

        </div>
    )
}