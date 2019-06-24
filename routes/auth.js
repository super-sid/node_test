
const _ =require('lodash');
const jwt=require('jsonwebtoken');
const Joi=require('joi');
const config=require('config');
const bcrypt=require('bcrypt');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('invalid email or password');

const validpassword=await bcrypt.compare(req.body.password,user.password);
if(!validpassword)return res.status(400).send('invalid email or password');
const token=user.generateAuthToken(); 
res.send(token);


});

function validate(req) {
    const schema = {
      //name: Joi.string().min(5).max(50).required(),
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(1024).required()
  
    };
  
    return Joi.validate(req, schema);
  }
  


module.exports=router;  