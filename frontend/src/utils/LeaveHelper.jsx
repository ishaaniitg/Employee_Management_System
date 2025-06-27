import { useNavigate } from "react-router-dom"

 export const cols = [
    {
        name:" S NO",
        selector : (row) => row.sno,
        width:'80px',
    },
    {
        name:"Emp ID",
        selector : (row) => row.employeeId,
        width:'130px',
        sortable:true,
    },
    {
        name:"Name",
        selector : (row) => row.name,
        width:'200px',
    },
    {
        name:"Leave Type",
        selector : (row) => row.leaveType,
        width:"200px",
         center: 'true',
    },
    {
        name:"Department",
        selector : (row) => row.department,
        center:'true'
    },
    {
        name:"Days",
        selector : (row) => row.days,
        center:'true',
    },
    {
        name:"Status",
        selector : (row) => row.status,
        center:'true',
    },
    {
        name:"Action",
        selector : (row) => row.action,
        center:'true',
    },

]



export const LeaveButtons = ({id})=>{
    const navigate = useNavigate()

    const handleView = (id)=>{
        
        navigate(`/admin_dash/leave/${id}`)
    }

    return (
        <button className="px-4 py-1 bg-teal-500 rounded text-white hover:bg-teal-600"
        onClick={()=>handleView(id)}
        >
            
            View
        </button>
    )
}