import express from 'express'
import { getSummary } from '../controller/Dashcontroller.js'
const router = express.Router()

router.get('/summary', getSummary)

export default router