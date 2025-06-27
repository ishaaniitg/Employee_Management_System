import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const login  =async (req,res)=>{
    const {email,pass} = req.body
    const user = await User.findOne({email:email})

    if(!user){
        res.send('username does not exists')
    } else {
    const userPass = await bcrypt.compare(pass,user.password) // compares stored long hashed password , with the entered root password
    if(!userPass){
        res.send('wrong Password')
    } else {
        console.log(`username : ${user} pass found : ${userPass}`);
        res.status(200).json({success:true,user:{
            _id:user._id,
            name:user.name,
            role:user.role 
        }})
    }
}
}
export default login 