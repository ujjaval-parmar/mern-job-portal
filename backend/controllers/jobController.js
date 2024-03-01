const jobController = require('express').Router();

const Job = require('../models/jobModel');
const User = require('../models/userModel');

const verifyToken = require('../middlewares/varifyToken')


jobController.get('/getAllJobs',  async(req, res)=>{

    try{

        const allJobs = await Job.find();
        res.status(200).json({
            status: 'success',
            message: 'Get All Jobs  success',
            data: allJobs,
        })

    }catch(err){
        res.status(500).json({
            status: 'failed',
            message: "Get all Jobs Failed!",
            error: err.message
        })
    }


})

jobController.get('/getAllJobsByEmail', verifyToken,  async(req, res)=>{

    try{
        // console.log(req.user);
        const curUser = await User.findById({_id: req.user.id})
        // console.log(curUser);
        const allJobs = await Job.find({postedBy: curUser.email});
        console.log(allJobs)
        res.status(200).json({
            status: 'success',
            message: 'Get All Jobs by Email  success',
            data: allJobs,
        })

    }catch(err){
        res.status(500).json({
            status: 'failed',
            message: "Get all Jobs by Email Failed!",
            error: err.message
        })
    }


});


jobController.get('/getJobById/:jobId', verifyToken,  async(req, res)=>{

    try{
        
        // console.log(curUser);
        const job = await Job.findById({_id: req.params.jobId});
        console.log(job)
        res.status(200).json({
            status: 'success',
            message: 'Get All Job by Id  success',
            data: job,
        })

    }catch(err){
        res.status(500).json({
            status: 'failed',
            message: "Get all Job by Id Failed!",
            error: err.message
        })
    }


})

jobController.post('/post-job', verifyToken, async(req, res)=>{

    try{

        const result = await Job.create(req.body);
        res.status(200).json({
            status: 'success',
            message: 'Post Job  success',
            data: result,
        })

    }catch(err){
        res.status(500).json({
            status: 'failed',
            message: "Post Job Failed!",
            error: err.message
        })
    }


})


jobController.put('/update-job/:jobId', async(req, res)=>{
    try{

        const result = await Job.findByIdAndUpdate({_id: req.params.jobId}, req.body);
        res.status(200).json({
            status: 'success',
            message: 'Update Job  success',
            data: result,
        })

    }catch(err){
        res.status(500).json({
            status: 'failed',
            message: "Update Job Failed!",
            error: err.message
        })
    }
})

jobController.delete('/delete-job/:jobId', async(req, res)=>{
    try{

        const result = await Job.findByIdAndDelete({_id: req.params.jobId});
        res.status(200).json({
            status: 'success',
            message: 'Delete Job  success',
            data: result,
        })

    }catch(err){
        res.status(500).json({
            status: 'failed',
            message: "Delete Job Failed!",
            error: err.message
        })
    }
})



module.exports = jobController;