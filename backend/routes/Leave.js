import express from 'express'
import { addLeave, fetchLeaves, getLeaveDeatils, updateLeave,  } from '../controller/LeaveController.js'
import { getLeaves } from '../controller/LeaveController.js'
const router = express.Router()

router.get('/', fetchLeaves)
router.post('/add', addLeave)
router.get('/:id' , getLeaves)
router.put('/:id' , updateLeave)
router.get('/details/:id' , getLeaveDeatils)
export default router