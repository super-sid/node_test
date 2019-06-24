const {Thread, validate} = require('../models/thread'); 
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const jwt =require('jsonwebtoken');
const config =require('config');
const auth=require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  const threads = await Thread.find();
  res.send(threads);
});

router.post('/', auth,async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);


  const token=req.header('x-auth-token');
  if(!token) return res.status(401).send('Access denied. No token provided');
  
  const decoded=jwt.verify(token,config.get('jwtPrivateKey'));
  const user = await User.findById(decoded._id);
  if (!user) return res.status(400).send('Invalid user.');
  console.log(user);
  let thread = new Thread({ 
  question: req.body.question,
  userasked: user.name  
   
  });
  thread = await thread.save();
  res.send(thread);
});


router.put('/:id',auth, async (req, res) => {
 
  

  const token=req.header('x-auth-token');
  if(!token) return res.status(401).send('Access denied. No token provided');
  
  const decoded=jwt.verify(token,config.get('jwtPrivateKey'));
  const user = await User.findById(decoded._id);
  if (!user) return res.status(400).send('Invalid user.');
  const thread = await Thread.findById(req.params.id);
     
  thread.answers.push({useranswered:user.name,answer:req.body.answer});
  if (!thread) return res.status(404).send('The thread with the given ID was not found.');
  console.log(thread.answers);
  await thread.save();
  res.send(thread);
});


module.exports = router; 