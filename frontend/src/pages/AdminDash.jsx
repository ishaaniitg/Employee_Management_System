import AdminSidebar from '../components/Dashboard/AdminSidebar'
import {useAuth} from '../context/AuthContext'
import Navbar from '../components/Dashboard/Navbar'
import AdminSummary from '../components/Dashboard/AdminSummary'
import { Outlet } from 'react-router-dom'
function AdminDash() {
  const {user} = useAuth()
  return (
    <>
  { user &&  <div className='flex'>
      <AdminSidebar/>
      <div className='flex-1 bg-gray-100 h-screen'>
        <Navbar/>
        <Outlet/> 
      </div>
    </div>
}
</>
  )
}

export default AdminDash
