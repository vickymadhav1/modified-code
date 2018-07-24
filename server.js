const express = require('express');
const path = require('path')
const nodemailer = require('nodemailer');
const bodyparser= require('body-parser');
const exphbs = require('express-handlebars');

const app =express();


// app.get('/assets/apps/css/inbox.css', function(req, res){
//     res.sendFile(__dirname + '/assets/apps/css/inbox.css');
//     });  


app.use('/css', express.static('css')); //load files & plugins from assets
app.use('/img', express.static('img'));
app.use('/include', express.static('include'));
app.use('/js', express.static('js'));
app.use('/mail', express.static('mail'));
app.use('/scss', express.static('scss'));
app.use('/vendor', express.static('vendor'));
app.use('/include', express.static('include'));

//index page calling
app.get('/*', function (req, res) {
   res.sendFile(__dirname + '/index.html');
});
app.engine('handlebars',exphbs());
app.set('view engine','handlebars');
//body parser middle ware
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.post('/send', (req,res) => {

   console.log('Email is ', req.body)
const output=`
<p>You have a new Enquiry</p>
<h3>Contact detils</h3>
<ul>
<li>Email: ${req.body.email}</li>
<li>option: ${req.body.option}</li>
<li>message: ${req.body.message}</li>
</ul>
<h3>message<h3>

<h5>${req.body.message }</h5>
`;

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
   // host: 'mail.traversymeadia.com',
   service: 'gmail',
   port: 587,
   secure: false, // true for 465, false for other ports
   auth: {
       user:'testvigilare@gmail.com', // generated ethereal user
       pass: 'testdurity' // generated ethereal password
   },
   tls:{
       rejectUnauthorized:false
   }
});

// setup email data with unicode symbols
let mailOptions = {
   from: '"Tango Trax" <testvigilare@gmail.com>', // sender address
   to: 'hello@tangotech.co.in', // list of receivers
   subject: 'Request demo', // Subject line
   text: 'Hello world!', // plain text body
   html: output // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
   if (error) {
       return console.log(error);
   }
   
   // console.log('Message sent: %s', info.messageId);
   // // Preview only available when sending through an Ethereal account
   // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
   // res.render('contact',{msg:'gmail has been sent'});

});

});



app.listen(5000, function () {
   console.log('port is running on 5000!')
});