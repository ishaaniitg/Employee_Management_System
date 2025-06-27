import User from "../models/user.js"
import bcrypt from 'bcrypt'
import Employee from "../models/EmpModel.js"
export const changePass =  async (req,res)=>{
      try {
        const {userId,oldPassword,
        newPassword,
        confirmPassword} = req.body
        const user = await User.findById({_id:userId})

        console.log('req is : ' , userId,oldPassword,
        newPassword,
        confirmPassword);

        console.log('user is : ', user);

        if(user.role === 'admin'){
            const hashPassword  = await bcrypt.hash(newPassword,10)
            const newAdmin = await User.findByIdAndUpdate({_id:user._id},{password:hashPassword})
            console.log(newAdmin);
            
            return res.status(200).json({success:true,newAdmin})
        }
        
        
        const isMatch = await bcrypt.compare(oldPassword,user.password)
        if(!isMatch) {
            return res.status(404).json({success:false,error:'Old password not found'})
        } 
        const hashPass  = await bcrypt.hash(newPassword,10)
        let UserPass =  user.password
        const newUser = await  User.findByIdAndUpdate({_id:user.id},{password:hashPass})
        const newEmp = await Employee.findOneAndUpdate({password:UserPass},{password:hashPass})
        

        return res.status(200).json({success:true})
     } catch (error) {
        console.error(error) 
        return res.status(500).json({success:false,error:'Server error'})
    }
}