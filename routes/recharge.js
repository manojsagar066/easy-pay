var express = require("express");
var router  = express.Router();
var Student = require("../models/studen");
var middleware = require("../middleware");
router.get("/",middleware.isLoggedIn,function(req,res){
    res.render("recharge",{x:2});
});
router.post("/",function(req,res)
{
    var b=req.body.Recharge;
    var r=req.body.RFIDno;
    if(r.length==0 || b.toString().length==0 || typeof(parseInt(b))=="string")
    {   
        res.render("recharge",{x:1});
    }
    else{
        Student.findOne({RFID:r},function(err,found)
        {
            if(err) console.log(err);
            else if(found==null) res.render("recharge",{x:1});
            else
            {
                var bal= found.Balance;
                bal = bal + parseInt(b);
                found.Balance=bal;
                found.save(function(err,data)
                {
                    if(err) console.log(err);
                    else res.render("recharge",{x:0});
                })
            }
        });
    }
});
module.exports = router;