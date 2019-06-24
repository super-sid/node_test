const {Job} = require('../models/job'); 
//const {User} = require('../models/user');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const moment = require('moment');
const express = require('express');
const cron = require("node-cron");
var nodemailer = require('nodemailer');
const jwt =require('jsonwebtoken');
const config =require('config');
const auth=require('../middleware/auth');
const mail=require('../middleware/mail');
const router = express.Router();


router.post('/', auth,async (req, res) => {


  const token=req.header('x-auth-token');
  if(!token) return res.status(401).send('Access denied. No token provided');
  
  const decoded=jwt.verify(token,config.get('jwtPrivateKey'));
  const user = await User.findById(decoded._id);
  //const user2=await User.find({"email":user.email});
  if (!user) return res.status(400).send('Invalid user.');
  console.log(user);
  var currentDate = new Date();
  let job = new Job({ 
  user_details:{
    user_email:user.email,
    user_name:user.name
    },
  job_desc:req.body.job_desc,
  completion_bookmark:"just started",
  starting_time:currentDate,
  deadline_time:req.body.deadline_time 
   });
  job = await job.save();
  //
  res.send(job);
  
  
  // mail({"to":user.email,"subject":"you have started a new task"});

  });


  router.put('/:id',auth, async (req, res) => {
 
  

  const token=req.header('x-auth-token');
  if(!token) return res.status(401).send('Access denied. No token provided');
  
  const decoded=jwt.verify(token,config.get('jwtPrivateKey'));
  const user = await User.findById(decoded._id);
  if (!user) return res.status(400).send('Invalid user.');
  const job = await Job.findByIdAndUpdate(req.params.id,
    { 
      completion_bookmark: req.body.bookmark,
    }, { new: true });
  if (!job) return res.status(404).send('The thread with the given ID was not found.');
  //console.log(job);
  await job.save();
  res.send(job);
});



module.exports = router; 