var express = require("express");
var router  = express.Router();
var Student = require("../models/studen");
var middleware = require("../middleware");
router.get("/",middleware.isLoggedIn,function(req,res){
    res.render("update_student_data",{x:0});
    console.log("opt");
});
//STUDENT UPDATION PROCESS TAKES PLACE HERE
router.post("/",function(req,res)
{
    var r = req.body.RFID;
    var u = req.body.USN;
    var opt =req.body.opt;
    var item =req.body.item;
    var val = req.body.val;
        if(opt=="delete")
        {
            if(r.length==0 || u.length==0 )
            {
                res.render("update_student_data",{x:1});
            }
            else
            {
                if(item=="new_USN")
                {
                    Student.deleteOne({USN:u},function(err)
                    {
                        if(err) console.log("Error in delete "+err);
                        else res.render("update_student_data",{x:2});
                    });
                }
                else
                {
                    Student.deleteOne({RFID:r}, function (err)
                    {
                    if(err) console.log("Error in delete "+err);
                    else res.render("update_student_data",{x:2});
                    });
                }
            }
        }
        else
        {   
            if(r.length==0 || u.length==0 || val.length==0)
            {
                res.render("update_student_data",{x:1});
            }
            else
            {
                if(item=="new_Name")
                {
                    Student.findOne({RFID:r},function(err,foundStudent)
                    {
                        if(err) console.log(err);
                        else if(foundStudent==null) res.render("update_student_data",{x:1});
                        else
                        {
                            foundStudent.name=val;
                            foundStudent.save(function(err,data)
                            {
                                if(err) console.log(err);
                            });
                            res.render("update_student_data",{x:2});
                        }
                    });
                }
                else if(item=="new_USN")
                {
                    Student.findOne({RFID:r},function(err,foundStudent)
                    {
                        if(err) console.log(err);
                        else if(foundStudent==null) res.render("update_student_data",{x:1});
                        else
                        {
                            foundStudent.USN=val;
                            foundStudent.save(function(err,data)
                            {
                                if(err) console.log(err);
                            });
                            res.render("update_student_data",{x:2});
                        }   
                    });
                }
                else if(item=="new_Phoneno")
                {
                    Student.findOne({USN:u},function(err,foundStudent)
                    {
                        if(err) console.log(err);
                        else if(foundStudent==null) res.render("update_student_data",{x:1});
                        else
                        {
                            foundStudent.PhoneNo=parseInt(val);
                            foundStudent.save(function(err,data)
                            {
                                if(err) console.log(err);
                            });
                            res.render("update_student_data",{x:2});
                        }
                    });
                }
                else if(item=="new_RFID")
                {
                    Student.findOne({USN:u},function(err,foundStudent)
                    {
                        if(err) console.log(err);
                        else if(foundStudent==null) res.render("update_student_data",{x:1});
                        else
                        {
                            foundStudent.RFID=val;
                            foundStudent.save(function(err,data)
                            {
                                if(err) console.log(err);
                            });
                            res.render("update_student_data",{x:2});
                        }
                    });
                }
                else if(item=="new_Course")
                {
                    Student.findOne({RFID:r},function(err,foundStudent)
                    {
                        if(err) console.log(err);
                        else if(foundStudent==null) res.render("update_student_data",{x:1});
                        else
                        {
                            foundStudent.Course=val;
                            foundStudent.save(function(err,data)
                            {
                                if(err) console.log(err);
                            });
                            res.render("update_student_data",{x:2});
                        }
                    });
                }
                else
                {
                    Student.findOne({RFID:r},function(err,foundStudent)
                    {
                        if(err) console.log(err);
                        else if(foundStudent==null) res.render("update_student_data",{x:1});
                        else
                        {
                            foundStudent.DOB=val;
                            foundStudent.save(function(err,data)
                            {
                                if(err) console.log(err);
                            })
                        }
                    });
                }
            }
            
        }  
});
module.exports = router;