import { Model } from 'mongoose';
import LeaveModel from '../models/Leavemodel.js'
import User from '../models/user.js'
import Employee from '../models/EmpModel.js';
export const addLeave = async (req,res)=>{
    try {
        const {userId,leaveType,StartDate,EndDate,reason} = req.body

        console.log('frontend sends' , req.body);
        const employee = await User.findById({_id:userId})

        const newlv = new LeaveModel({
           employeeId: employee._id,leaveType,StartDate,EndDate,reason
        })
         await newlv.save()
       //  await Employee.findByIdAndUpdate({_id:employeeId},{$set :{Salary:TotalSalary}})

         return res.status(200).json({success:true})
    } catch (error) {
        console.error(error) 
        return res.status(500).json({success:false,error:'Server error'})
    }
}

export const getLeaves = async (req,res)=>{
    try {
        const {id} = req.params;
        console.log('id sent in list : ', id)

        let emp = await User.find({_id:id})
        console.log('currently emp is ', emp);
        
        if(emp === null || emp.length < 1) {
         const Emp = await Employee.find({_id:id})
         console.log(Emp);
         
         emp = await User.find({email:Emp[0].email,password:Emp[0].password})
        }
        console.log('finally emp is ', emp);
        
        const leaves = await LeaveModel.find({employeeId:emp[0]._id})
        console.log(leaves);
        
         return res.status(200).json({success:true,leaves})
    }  catch (error) {
        console.error(error) 
        return res.status(500).json({success:false,error:'Server error'})
    }
}

export const fetchLeaves = async(req,res)=>{
      try {
    const leaves = await LeaveModel.find();

    const enrichedLeaves = await Promise.all(
      leaves.map(async (leave) => {
        const user = await User.findById(leave.employeeId);
        if (!user) return null;

        const emp = await Employee.findOne({
          email: user.email,
          password: user.password,
        });

        return {
          _id: leave._id,
          leaveType: leave.leaveType,
          reason: leave.reason,
          from: leave.StartDate,
          to: leave.EndDate,
          status: leave.status,
          name: emp?.name || 'Unknown',
          department: emp?.department || 'Unknown',
          employeeId: emp?.employeeId || 'Unknown', // ← added here
        };
      })
    );

    const filteredLeaves = enrichedLeaves.filter(l => l !== null);

    return res.status(200).json({ success: true, leaves: filteredLeaves });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
}

export const getLeaveDeatils = async (req,res)=>{
      try {
    const { id } = req.params;
    console.log('id frontend sent : ',id);
    
    if (!id || id === 'undefined') {
      return res.status(400).json({ success: false, error: 'Invalid ID parameter' });
    }

    // Get the specific leave request
    const leave = await LeaveModel.findById(id);
    if (!leave) return res.status(404).json({ success: false, error: 'Leave not found' });

    // Find the user (Leave's employeeId points to User)
    const user = await User.findById(leave.employeeId);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });

    // Find the corresponding Employee (email + password match)
    const emp = await Employee.findOne({
      email: user.email,
      password: user.password
    });

    // Respond with enriched leave details
    return res.status(200).json({
      success: true,
      leave: {
        _id: leave._id,
        leaveType: leave.leaveType,
        reason: leave.reason,
        StartDate: leave.StartDate,
        EndDate: leave.EndDate,
        status: leave.status,
        name: emp?.name || 'Unknown',
        department: emp?.department || 'Unknown',
        employeeId: emp?.employeeId || 'Unknown'
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
}
export const updateLeave = async (req,res)=>{
  try {
    const {id} = req.params
    console.log('id sent in update is ',id);
    console.log('status sent is ', req.body.status);
    
    
    const leave = await LeaveModel.findByIdAndUpdate({_id:id},{status:req.body.status})
    if(!leave) {
       return res.status(404).json({success:false,error:'leave not found'})
    }
      return res.status(200).json({success:true,leave})
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
}