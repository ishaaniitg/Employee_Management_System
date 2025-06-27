import {BrowserRouter, Routes , Route ,Navigate} from 'react-router-dom'
import Login from './pages/Login'
import AdminDash from './pages/AdminDash'
import EmployeeDash from './pages/EmployeeDash'
import AdminSummary from './components/Dashboard/AdminSummary'
import DepartmentList from './components/Departments/DepartmentList'
import AddDepartment from './components/Departments/AddDepartment'
import EditDepartment from './components/Departments/EditDepartment'
import EmpList from './components/Employees/EmpList'
import AddEmp from './components/Employees/AddEmp'
import View from './components/Employees/View'
import Edit from './components/Employees/Edit'
import Add from './components/Salary/Add'
import ViewSalary from './components/Salary/ViewSalary'
import Summary from './components/EmployeeDashboard.jsx/Summary'
import MyProfile from './components/EmployeeDashboard.jsx/MyProfile'
import List from './components/Leaves/List'
import AddLeave from './components/Leaves/AddLeave'
import Settings from './components/EmployeeDashboard.jsx/Settings'
import Table from './components/Leaves/Table'
import Details from './components/Leaves/Details'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navigate to="/login" replace />}/>
      <Route path='/login' element={<Login/>}/>

      <Route path='/admin_dash' element={<AdminDash />}>

      <Route index element = {<AdminSummary/>}/> {/* By default route */}
      <Route path = '/admin_dash/departments' element = {<DepartmentList/>}/>
      <Route path = '/admin_dash/addDep' element = {< AddDepartment/>}/>
      <Route path = '/admin_dash/departments/:id' element = {<EditDepartment/>}/>
      <Route path = '/admin_dash/employees' element = {<EmpList/>}/>
       <Route path = '/admin_dash/add_employee' element = {< AddEmp/>}/>
       <Route path = '/admin_dash/employee/:id' element = {<View/>}/>
        <Route path = '/admin_dash/employee/edit/:id' element = {<Edit/>}/>
        <Route path = '/admin_dash/salary' element = {<Add/>}/>
        <Route path = '/admin_dash/employee/salary/:id' element = {<ViewSalary/>}/>
        <Route path = '/admin_dash/leaves' element = {<Table/>}/>
        <Route path = '/admin_dash/leave/:id' element = {<Details/>}/>
        <Route path = '/admin_dash/employee/leaves/:id' element = {<List/>}/>
        <Route path = '/admin_dash/settings' element = {<Settings/>}/>
      </Route>

      <Route path='/employee_dash' element = {<EmployeeDash />} >

            
      <Route index element = {<Summary/>}/>
      <Route path='/employee_dash/profile/:id' element = {<MyProfile/>} />
      <Route path='/employee_dash/leaves' element = {<List/>} />
       <Route path='/employee_dash/add_leave' element = {<AddLeave/>} />
       <Route path='/employee_dash/salary/:id' element = {<ViewSalary/>} />
        <Route path='/employee_dash/settings' element = {<Settings/>} />
      </Route>
    </Routes> 
    </BrowserRouter>
  )
}

export default App
