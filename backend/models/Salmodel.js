import mongoose from 'mongoose'
import { Schema } from 'mongoose'
const salarySchema = new mongoose.Schema({
    employeeId:{type:Schema.Types.ObjectId, ref:'Employee',required:true},// tells that the field is an _id from another monoose schema field
    basicSalary:{type:Number},
    allowances:{type:Number}, 
    netSalary : {type:Number},
    payDate: {type:Date,required:true},
    createAt : {type:Date , default:Date.now},
    updateAt : {type:Date , default:Date.now},
})

const Salary  = mongoose.model('Salary',salarySchema)
export default Salary