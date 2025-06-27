import Department from "../models/departmentModel.js"
import Employee from "../models/EmpModel.js"
import User from '../models/user.js'
import Salary from '../models/Salmodel.js'
import Leave from '../models/Leavemodel.js'

export const getDepartments = async (req,res)=>{
    try {
        let departments = await Department.find()
        return res.status(200).json({success:true,departments})
    } catch(error){
       return  res.status(500).json({success:false,error:'Failed to fetch'})
    }
}


const AddDepartment = async ( req,res)=>{
    try {
        const {depname,desc} = req.body

        const newdepartment = new Department({
             dep_name:depname,
             description : desc, 
        })
        await newdepartment.save()
         return res.status(200).json({success:true,department:newdepartment})
    } catch (error) {
        res.status(500).json({success:false,error:'Server Error'})
    }
}

export default AddDepartment 

export const getDepartment = async (req,res)=>{
    try{
        const {id} = req.params;
        const dep = await Department.find({_id:id})
     return res.status(200).json({success:true,department:dep})
    } catch (error) {
        res.status(500).json({success:false,error:'Server Error'})
    }
}
export const updateDepartment = async (req,res)=>{
    try {
         const {depname,desc} = req.body
         const {id} = req.params;
         const updatedep = await Department.updateOne({_id:id} , {dep_name:depname,description:desc})

     return res.status(200).json({success:true,department:updatedep})
    } catch (error) {
        res.status(500).json({success:false,error:'Server Error'})
    }
}

export const deleteDepartment = async (req,res)=>{
    try{
        const {id} = req.params
        // find dep
        console.log('1st , id sent :  , ', id );
        
        const currdep = await Department.findById({_id:id})

        console.log('currdep is : ', currdep);
        
        const employee = await Employee.find({department:currdep.dep_name})

        console.log('employee is , ', employee);
        
        if(employee && employee.length){
             employee.map( async (emp,idx)=>{      
                console.log('at idx= ',idx , 'emp sitting : ',emp);
                         
                 const user = await User.findOne({email:emp.email, password:emp.password})

                 console.log('his user creds are : ', user);
                 
            if(user !== null)     await Leave.deleteMany({employeeId:user._id})
                 await Salary.deleteMany({employeeId:emp._id})
              if(user !=null)   await User.findByIdAndDelete({_id:user._id})
                 await Employee.findByIdAndDelete({_id:emp._id})
             })
        }

         await Department.findByIdAndDelete({_id:id})
         
    return res.status(200).json({success:true,message:'Successfully Deleted'})
    } catch (error) {
        res.status(500).json({success:false,error:'Server Error'})
    }
}