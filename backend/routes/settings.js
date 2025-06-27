import express from 'express'
import { changePass } from '../controller/Settingcontroller.js'

const router = express.Router()
router.put('/change-pass',changePass)

export default router