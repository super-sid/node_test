const Joi = require('joi');
const mongoose = require('mongoose');
//const {userSchema} = require('./user');

const Job = mongoose.model('Jobs', new mongoose.Schema({
    
  user_details: { 
    type: new mongoose.Schema({
     user_email:{
         type:String,
         required:true
        },
     user_name:{
         type:String,
         required:true
     }
      }),  
    required: true
  },job_desc: {
    type: String,
    required: true,
    trim: true, 
   },
    starting_time: { 
    type:String,  
    required: true
  },
  deadline_time: { 
    type: String,  
    required: true
  },
  completion_bookmark: { 
    type: String,  
    required: true
  }
}));



exports.Job = Job; 
//exports.validate = validateThread;
//exports.userSchema = userSchema;