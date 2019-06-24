const mongoose = require('mongoose');
var nodemailer = require('nodemailer');
const config=require('config');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const mail=require('/home/aseem/Music/jobscheduler/middleware/mail.js');
const cron = require("node-cron");
const movies = require('./routes/movies');
const {Job} = require('/home/aseem/Music/jobscheduler/models/job.js'); 
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const threads = require('./routes/threads');
const jobs = require('./routes/jobs');

const auth = require('./routes/auth');
const express = require('express');

const app = express();
require('./startup/prod')(app);
if(!config.get('jwtPrivateKey'))
{
console.error('Fatal Error :jwtprivatekey is not defined'); 
process.exit(1);  
}
var url = process.env.DATABASEURL || 'mongodb://localhost/cronjob';
//var url = "mongodb+srv://aseem:aseem@cluster0-njnzj.mongodb.net/vidly";
mongoose.connect(url);
//.then(() => console.log('Connected to MongoDB...'))
//.catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
//app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/threads', threads);
app.use('/api/jobs', jobs);

const port = process.env.PORT || 3000;
const id   = process.env.ID;


const call=async function(){
  const job=await Job.find();
  
    for (const key in job) {
      //console.log(job[0]);
       if(job[key].deadline_time==new Date())
       {
        mail({"to":job[key].user_details.email,"subject":"deadline raeched of your task"});
       }
    }
  }
  
cron.schedule("* * * * *", async function(){
  console.log("---------------------");
  console.log("Running Cron Job");
  call();
 
});


  
app.listen(port, id, () => console.log(`Listening on port ${port}...`, process.env.DATABASEURL, process.env.vidly_jwtPrivateKey));