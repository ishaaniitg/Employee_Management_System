import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import authRouter from './routes/auth.js'
import depRouter from './routes/department.js'
import emprouter from './routes/employee.js'
import salaryRouter from './routes/salary.js'
import LeaveRouter from './routes/Leave.js'
import settingsRouter from './routes/settings.js'
import dashboardRouter from './routes/dashboard.js'
mongoose.connect(process.env.MONGODB_URL);

const app = express()
const port = process.env.PORT

app.use(cors({
  origin:"https://employee-management-system-macx.vercel.app/",
  credentials:true
}))
app.use(express.json())



app.use('/api/auth',authRouter)
app.use('/api/department',depRouter)
app.use('/api/employee',emprouter)
app.use('/api/salary',salaryRouter)
app.use('/api/leave',LeaveRouter)
app.use('/api/settings',settingsRouter)
app.use('/api/dashboard',dashboardRouter)

app.get('/', (req, res) => {
  res.send('Hii')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})