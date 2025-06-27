import Salary from "../models/Salmodel.js"
import Employee from "../models/EmpModel.js"
import User from '../models/user.js'
export const addSalary = async (req,res)=>{
    try {
        const {employeeId,  basicSalary,allowances,payDate} = req.body

        const TotalSalary = Number(basicSalary) + Number(allowances);
        console.log('frontend sends' , req.body, 'total salary is ',TotalSalary);
        
        const newSalary = new Salary({
            employeeId,
            basicSalary,
            allowances,
            netSalary:TotalSalary,
            payDate,
        })
         await newSalary.save()
         await Employee.findByIdAndUpdate({_id:employeeId},{$set :{Salary:TotalSalary}})

         return res.status(200).json({success:true})
    } catch (error) {
        console.error(error) 
        return res.status(500).json({success:false,error:'Server error'})
    }
}

export const getSalary = async (req,res)=>{
    try{
        const {id} = req.params;
        let  salary = await Salary.find({employeeId:id}).populate('employeeId','employeeId') // employeeId as an attributed is referenced to original schema and its employeeId is also returned
        console.log(id);

        if(!salary || salary.length < 1){
            const employee = await User.findOne({_id:id})
            if (!employee) {
        return res.status(200).json({ success: true, error: 'User not found' });
            }

            const emp = await Employee.findOne({username:employee.username,password:employee.password})
            salary = await Salary.find({employeeId:emp._id}).populate('employeeId','employeeId')
        }
         return res.status(200).json({success:true,salary})
     } catch (error) {
        console.error(error) 
        return res.status(500).json({success:false,error:'Server error'})
    }
}