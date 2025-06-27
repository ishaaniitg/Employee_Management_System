import Employee from "../models/EmpModel.js"
import bcrypt from 'bcrypt'
import Department from "../models/departmentModel.js";
import User from "../models/user.js";
export const AddEmployee = async (req,res)=>{
    try {
        const {
        name,
    email,
    employeeId ,
    dob,
    gender,
    maritalStatus,
    designation,
    department,
    password ,
    Salary  
    } = req.body;

    const hashPass  = await bcrypt.hash(password,10)

    const existing = await Employee.find({email,
    employeeId ,
    dob,
    gender,
    maritalStatus,
    designation,
    department,
    password:hashPass ,
    Salary })

    if(existing.lentgh > 0 ) {
        res.status(500).json({success:false,error:`User already exists`})
    }


    const NewEmp = new Employee({
        name,
        email,
        employeeId,
        dob,
        gender,
        maritalStatus,
        designation,
        department : department,
        password:hashPass,
        Salary
    })
    const newuser = new User({
        email:email,
        password:hashPass,
        role: 'employee'

    })
    await NewEmp.save()
    await newuser.save()
    return res.status(200).json({success:true,message:'Employee created'})
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({success:false,error:`Server errror: ${error}`})
    }
}
export const getEmployees = async (req,res)=>{
    try {
        let employees = await Employee.find()
        return res.status(200).json({success:true,employees})
    } catch(error){
       return  res.status(500).json({success:false,error:'Failed to fetch'})
    }
}

export const getEmployee = async (req,res)=>{
    try{
        const {id} = req.params;
        
        const employee = await Employee.findOne({_id:id})
        
     return res.status(200).json({success:true,employee})
    } catch (error) {
        res.status(500).json({success:false,error:'Server Error'})
        console.log(error);
        
    }
}
export const updateEmployee = async (req,res)=>{
    try{
        const {id} = req.params
        const data =  req.body;
    const employee = await Employee.findById(id)
    if(!employee) return res.status(404).json({success:false,error:'User not found'})

    const updateEmp = await Employee.findByIdAndUpdate(id,{
        name:data.name,
        maritalStatus:data.maritalStatus,
        designation:data.designation,
        department:data.department,
        Salary:data.Salary
    }) 

     return res.status(200).json({success:true,message:'updated employee',updateEmp:updateEmp})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,error:'Server Error'})
    }
}

export const fetchEmployees = async (req,res)=>{
    try{
        const {id} = req.params;
        const employees = await Employee.find({department:id})
        
     return res.status(200).json({success:true,employees})
    } catch (error) {
        res.status(500).json({success:false,error:'Server Error'})
    }
}

export const findUser = async (req,res)=>{
     try{
        const {id} = req.params;
        const employee = await User.findById({_id:id})

        const newEmp = await Employee.find({email:employee.email,password:employee.password})
        
     return res.status(200).json({success:true,newEmp})
    } catch (error) {
        res.status(500).json({success:false,error:'Server Error'})
        console.log(error);
        
    }
}
