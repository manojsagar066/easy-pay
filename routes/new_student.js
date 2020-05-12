var express = require("express");
var router  = express.Router();
var Student = require("../models/studen");
var nodemailer = require("nodemailer");
var middleware = require("../middleware");
router.get("/",middleware.isLoggedIn,function(req,res){
    res.render("newstudent",{x:2});
});

//NEW STUDENT POST PROCESSING TAKES PLACE HERE
router.post("/",function(req,res)
{
    var n=req.body.sname;
    var r=req.body.RFID;
    var u=req.body.USN;
    var c=req.body.Course;
    var m=req.body.mail;
    var d=req.body.DOB;
    var p=parseInt(req.body.PhoneNo);

     //nodemailer mailer line 21 - 60
     const output = `
     <h3>Registered for smart payment</h3>
     <ul>
         <li>Name: ${req.body.sname}</li>
         <li>USN: ${req.body.USN}</li>
         <li>Course: ${req.body.Course}</li>
         <li>DOB: ${req.body.DOB}</li>
     </ul>
     <h3>Message</h3>
     <p>${req.body.message}</P>
 `;

 let transporter = nodemailer.createTransport({
    service:'gmail',
auth: {
    user: 'smartpay624@gmail.com',
    pass: 'sagar749'
},
tls:{
    rejectUnauthorized:false
}
});

let mailOptions = {
    from: '"smart-pay" <smartpay624@gmail.com>',
    to: req.body.mail,
    subject: 'payment details',
    text: 'Hello',
    html: output
};
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        
        return console.log(error);
    }

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
});


    if(d.length==0 || n.length == 0 || c.length==0 )
        {
            console.log("err");
            res.render("newstudent",{x:1});
        }
        else
        {
            Student.create(
            {
                RFID:r,
                name: n,
                USN: u,
                Course: c,
                DOB:d,
                Mail:m,
                PhoneNo:p,
                Balance:100,
            },
            function(err,data)
            {
                if(err)
                {   console.log(err);
                    res.render("newstudent",{x:1});
                }
                
                else
                {
                    console.log("ok");
                    res.render("newstudent",{x:0});
                }
            });
        }

});
module.exports = router;
