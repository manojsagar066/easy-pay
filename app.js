var express                             = require("express"),
    app                                 = express(),
    bodyParser                          = require("body-parser"),
    mongoose                            = require("mongoose"),
    passport                            = require("passport"),
    LocalStrategy                       = require("passport-local"),
    nodemailer                          = require('nodemailer'),
    passportLocalMongoose               = require("passport-local-mongoose"),
    User                                = require("./models/user"),
    indexRoutes                         = require("./routes/index"),
    newItemRoutes                       = require("./routes/new_items"),
    newStudentRoutes                    = require("./routes/new_student"),
    newTransactionRoutes                = require("./routes/new_transaction"),
    rechargeRoutes                      = require("./routes/recharge"),
    updateItemRoutes                    = require("./routes/update_item"),
    updateStudentRoutes                 = require("./routes/update_student");
    
     Student                          = require("./models/studen"),
     Transactions                     = require("./models/transactions"),
     Items                            = require("./models/f_items"),
     C_Items                          = require("./models/conveno_items"),
     L_Items                          = require("./models/libitems"),
     Fee_Items                        = require("./models/fee_items"),
     MongoClient                   = require('mongodb').MongoClient;
    const uri = "mongodb+srv://RFIDpayments:Ff6RfZyRN5arkgvz@payments-ukurt.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set("view engine", "ejs");
app.use(require("express-session")({
    secret: "Virat Kohli is the best batsmen cricket has ever seen (just my opinion)",
    resave: false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// *******************ROUTES*************************
app.use("/",indexRoutes);
//NEW STUDENT
app.use("/newstudent",newStudentRoutes);
//NEW TRANSACTIONS
app.use("/newtransaction",newTransactionRoutes);
//NEW ITEMS
app.use("/newitem",newItemRoutes);
//RECHARGE
app.use("/recharge",rechargeRoutes);
//UPDATE/DELETE ITEM 
app.use("/update_item_data",updateItemRoutes);
//UPDATE/DELETE STUDENT
app.use("/update_student_data",updateStudentRoutes);


app.get("/studentservice",function(req,res){
    res.render("studentservice");
});

app.post("/studentservice",function(req,res){
    var f_obj,fee_obj,c_obj,l_obj;
    var rfid,bal;
    var usn=req.body.USN;
    var count,id,i,j=0,k=0,l=0,m=0;
    Student.findOne({USN:usn},function(err,foundUser)
    {  
       if(err){
           console.log(err);
       }
       else{
                bal=foundUser.Balance;
                rfid=foundUser.RFID;
        Transactions.find({RFID:rfid},function(err,foundTransaction){
            count=foundTransaction.length;
            id=foundTransaction.ID;
            console.log(foundTransaction);
        
            res.render("transactionhistory",{data:foundTransaction,count:count,bal:bal});
        });

       }  
    });
});

app.get("/contact",(req,res)=>{
    res.render('contact');
});

app.post('/send',(req,res)=>{
    const output = `
        <p>you have a new contct request</p>
        <h3>contact details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>USN: ${req.body.usn}</li>
            <li>E-mail: ${req.body.email}</li>
            <li>Phone: ${req.body.phone}</li>
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
        from: 'req.body.email',
        to: 'smartpay624@gmail.com',
        subject: 'Help',
        text: 'Hello',
        html: output
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            
            return console.log(error);
        }

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.render('contact');
    });

});

app.get("*",function(req,res){
    res.send("The URL entered is invalid");
});
app.listen(9750,function(){
    console.log("Server start");
});

