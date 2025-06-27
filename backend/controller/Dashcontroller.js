import Department from "../models/departmentModel.js"
import Employee from "../models/EmpModel.js"
import Salary from '../models/Salmodel.js'
import Leave from '../models/Leavemodel.js'
export const getSummary = async (req,res)=> {
    try {
        const totalEmp = await Employee.countDocuments()
        const totalDeps = await Department.countDocuments()

        console.log(totalEmp,totalDeps);
        
        const totalSalaries = await Employee.aggregate([
            {$group : {_id:null , totalSalary : {$sum : '$Salary'}}}
        ])
        console.log(totalSalaries);
        

        const leaveStatus = await Leave.aggregate([
  {
    $group: {
      _id: '$status',           // Group by status
      count: { $sum: 1 }        // Count how many for each status
    }
  }
]);

// For readability, map _id to status
const leaveSumm = {
  approved: leaveStatus.find(item => item._id === 'Approved')?.count || 0,
  rejected: leaveStatus.find(item => item._id === 'Rejected')?.count || 0,
  pending: leaveStatus.find(item => item._id === 'Pending')?.count || 0
};

console.log(leaveSumm);

    return res.status(200).json({success:true,
        totalEmp,
        totalDeps,
        totalSalary : totalSalaries[0]?.totalSalary || 0,
        leaveSumm
    })
    } catch (error) {
        res.status(500).json({success:false,error:'Server Error'})
    }
}