var nodemailer = require('nodemailer');

module.exports=function(req,res,next){
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'aseem7570@gmail.com',
    pass: 'stipend5000'
  }
});

var mailOptions = {
  from: 'aseem7570@gmail.com',
  to: req.to,
  subject: req.subject,
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
    next()
  } else {
    console.log('Email sent: ' + info.response);
    next()
  }
}); 
}