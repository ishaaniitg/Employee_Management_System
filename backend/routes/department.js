import express from 'express'
import AddDepartment, { getDepartment } from '../controller/Departmentcontrol.js'
import { getDepartments } from '../controller/Departmentcontrol.js'
import { updateDepartment } from '../controller/Departmentcontrol.js'
import { deleteDepartment } from '../controller/Departmentcontrol.js'
const router = express.Router()

router.post('/add',AddDepartment)
router.get('/', getDepartments)
router.get('/:id',getDepartment)
router.put('/:id', updateDepartment )
router.delete('/:id' , deleteDepartment)
export default router