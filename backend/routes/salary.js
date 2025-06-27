import express from 'express'
import { addSalary, getSalary } from '../controller/Salarycontroller.js'
const router = express.Router()

router.post('/add', addSalary)
router.get('/:id' , getSalary)

export default router