import express from 'express'
import { AddEmployee, findUser } from '../controller/employeeController.js'
import { getEmployees } from '../controller/employeeController.js'
import { getEmployee } from '../controller/employeeController.js'
import { updateEmployee } from '../controller/employeeController.js'
import { fetchEmployees } from '../controller/employeeController.js'
const router = express.Router()

router.post('/add',AddEmployee)
 router.get('/', getEmployees)
 router.get('/:id',getEmployee)
 router.put('/:id', updateEmployee )
 router.get('/user/:id', findUser)
 router.get('/salary/:id', fetchEmployees )
export default router