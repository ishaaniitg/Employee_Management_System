 import axios from 'axios'
 import { useNavigate } from 'react-router-dom'


 export const cols = [
    {
        name:" S NO",
        selector : (row) => row.sno,
        width:'70px',
        fontSize:'16px'
    },
    {
        name:"Name",
        selector : (row) => row.name,
       width:'130px',
        sortable:true,
        wrap:true
    },
    {
        name:"Department",
        selector : (row) => row.department,
       width:'200px',
        wrap: true
    },
    {
        name:"DOB",
        selector : (row) => row.dob,
        width:"200px",
         center: 'true',
          hide: 'sm'
    },
    {
        name:"Action",
        selector : (row) => row.action,
        center:'true'
    },

]

export const customStyles = {
  rows: {
    style: {
      fontSize: '16px', // 🆙 Increase font size for rows
    },
  },
  headCells: {
    style: {
      fontSize: '17px', // 🆙 Increase font size for header
      fontWeight: 'bold',
    },
  },
  cells: {
    style: {
      fontSize: '16px', // 🆙 Increase font size for cell content
    },
  },
};


 export const fetchdep = async ()=>{
    let departments 
      try {
        const res = await axios.get('http://localhost:3000/api/department')
        

         if(res.data.success) {
            departments = res.data.departments
      }
      } catch (error) {
        alert('error')
        console.log(error);
      }
      return departments
    }
    // fetch employee name

    export const getemployees = async (id)=>{
    let employees
      try {
        const res = await axios.get(`http://localhost:3000/api/employee/salary/${id}`)
        

         if(res.data.success) {
            employees = res.data.employees
      }
      } catch (error) {
        alert('error')
        console.log(error);
      }
      return employees
    }

    export const EmpButtons = ({id})=>{
    // const confirm  = window.confirm("Do u want to delete ? ")
    const navigate = useNavigate()

    
    return(
        <div className="flex space-x-3">
            <button className="px-3 py-1 bg-teal-600 text-white cursor-pointer rounded-lg duration-100 transition-all active:scale-95" onClick={()=>{navigate(`/admin_dash/employee/${id}`)}}>
                  View</button>

            <button className="px-3 py-1 bg-blue-600 text-white cursor-pointer rounded-lg  duration-100 transition-all active:scale-95"
            onClick={()=>{navigate(`/admin_dash/employee/edit/${id}`)}}
            >Edit</button>

            <button className="px-3 py-1 bg-yellow-600 text-white cursor-pointer rounded-lg  duration-100 transition-all active:scale-95"
            onClick={()=>{navigate(`/admin_dash/employee/salary/${id}`)}}
            >Salary</button>

            <button className="px-3 py-1 bg-red-600 text-white cursor-pointer rounded-lg  duration-100 transition-all active:scale-95"
            onClick={()=>{navigate(`/admin_dash/employee/leaves/${id}`)}}
            >Leave</button>

        </div>
    )
}

export const EmpWelcome = async (id)=>{
  let data = ''
            try{      
        const res = await axios.get(`http://localhost:3000/api/employee/user/${id}`)
        if(res.data.success) {
          console.log('successfull' , res);
          data = res.data.newEmp[0].name
        }
      } catch (error)  {
        console.log(error);
        alert('error occured')
      }
      return data
  }