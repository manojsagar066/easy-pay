var express = require("express");
var router  = express.Router();
var Items = require("../models/f_items");
var C_Items = require("../models/conveno_items");
var Fee_Items = require("../models/fee_items");
var L_Items = require("../models/libitems");
var middleware = require("../middleware");
router.get("/",middleware.isLoggedIn,function(req,res){

    res.render("newitem",{x:0});
});

// ROUTE TO NEW TRANSACTION FORM
router.post("/",function(req,res)
{
    var n=req.body.Iname;
    var f=req.body.ID;
    var c=req.body.cost;
    if(n.length==0 || f.toString().length==0 || c.toString().length==0 )
    {
        res.render("newitem",{x:1});
    }
    else {
        if(req.body.item=="Food")
        {
            Items.create(
            {
                FID:f,
                Fname: n,
                Fcost: c,
            },
            function(err)
            {
                if(err) res.render("newitem",{x:1});
            });
        }
        else if(req.body.item=="Conveno")
        {
            C_Items.create(
            {
                CID:f,
                Cname: n,
                Ccost: c,
            },
            function(err)
            {
                if(err) res.render("newitem",{x:1});
            }
            );
        }
        else if(req.body.item=="Fee_Dept")
        {
            Fee_Items.create(
            {
                FeeID:f,
                Feename: n,
                Feecost: c,
            }
            ,
            function(err)
            {
                if(err) res.render("newitem",{x:1});
            });
        }
        else
        {
            L_Items.create(
            {
                LID:f,
                Lname: n,
                Lcost: c,
            },
            function(err)
            {
                if(err) res.render("newitem",{x:1});
            });
        }
        res.render("newitem",{x:0});
    }
});
module.exports = router;