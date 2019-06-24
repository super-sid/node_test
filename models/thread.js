const Joi = require('joi');
const mongoose = require('mongoose');
const {userSchema} = require('./user');

const Thread = mongoose.model('Threads', new mongoose.Schema({
    question: {
    type: String,
    required: true,
    trim: true, 
   },
 userasked: { 
    type: String,  
    required: true
  },
  answers: [{ 
    type: new mongoose.Schema({
      useranswered: {
        type: String
        },
      answer: {
        type: String
      }      
    })
  }]
}));

function validateThread(thread) {
  const schema = {
    question: Joi.string().required(),
    
    userasked: Joi.string().min(0)
  };

  return Joi.validate(thread, schema);
}

exports.Thread = Thread; 
exports.validate = validateThread;
exports.userSchema = userSchema;