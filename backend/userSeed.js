import User from "./models/user.js"
import bcrypt from 'bcrypt'

import mongoose from 'mongoose'
mongoose.connect('mongodb://127.0.0.1:27017/EMS');

const userRegister = async () =>{
    const hashPass = await bcrypt.hash('admin', 10) // create a strong password out of which direct password cannot be recovered 
    const newUser = new User({
        name:"Admin",
        email:"admin@gmail.com",
        password:hashPass,
        role:"admin"
    })
    await newUser.save()
}
userRegister()