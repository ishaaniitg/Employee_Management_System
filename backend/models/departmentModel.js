import mongoose from 'mongoose'
import Employee from './EmpModel.js'
const depSchema = new mongoose.Schema({
    dep_name:{type:String,required:true},
    description : {type:String},
    createdAt : {type:Date , default: new Date()},
    updatedAt : {type:Date, default: new Date()}
})


const Department  = mongoose.model('Department',depSchema)
export default Department