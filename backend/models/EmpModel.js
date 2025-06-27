import mongoose from 'mongoose'
const empSchema = new mongoose.Schema({
    name: String,
    email : String,
    employeeId:String,
    dob : {type:Date},
    gender:String,
    maritalStatus:String,
    designation:String,
    department:String,
    password : String,
    Salary :  Number,
    createAt : {type:Date , default:Date.now},
    updateAt : {type:Date , default:Date.now},
})

const Employee  = mongoose.model('Employee',empSchema)
export default Employee