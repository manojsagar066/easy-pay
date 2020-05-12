var express = require("express");
var router  = express.Router();
var Student = require("../models/studen");
var Transactions = require("../models/transactions");
var Items = require("../models/f_items");
var C_Items = require("../models/conveno_items");
var Fee_Items = require("../models/fee_items");
var L_Items = require("../models/libitems");
var middleware = require("../middleware");
router.get("/",middleware.isLoggedIn,function(req,res){
    res.render("newtransaction",{x:4});
});
function transacCreate(it,i,t,q,r,totalcost)
{
    Transactions.create(
        {
            quantity: q,    
            Time:t,
            Category:it, 
            ID:i,
            RFID:r,
        },function(err,post)
            {
                //link the new transation to the student using his or her rfid
                if(err) console.log(err);
            });
    //link the item bought by the student for the above transaction
        if(it=="Library")
        {
            L_Items.findOne({LID:i},function(err,foundItem)
            {
                if(err) console.log(err);
                else
                { 
                    if(foundItem==null) res.render("newtransaction",{x:2});
                    else
                    { 
                        Transactions.findOne({Time:t,Category:it},function(err,foundUser)
                        {
                            if(err) console.log(err);
                            else if(foundUser==null) console.log("Null");
                            else
                            {
                                foundUser.item_name=foundItem.Lname;
                                foundUser.total_Cost= q*foundItem.Lcost;
                                foundUser.save(function(err,data)
                                {
                                    if(err) console.log(err);
                                    else
                                    {
                                        console.log(data);
                                    }
                                })
                            }   
                        })
                    }
                }
            }); 
        }
        else if(it=="Food")
        {
            Items.findOne({FID:i},function(err,foundItem)
            {
                if(err) console.log(err);
                else
                {
                    if(foundItem==null) res.render("newtransaction",{x:2});
                    else
                    {
                        var post=foundItem._id;
                        
                        //push the object id of the item to the transaction
                        Transactions.findOne({Time:t,Category:it},function(err,foundUser)
                        {
                            if(err) console.log(err);
                            else if(foundUser==null) console.log("Null boy");
                            else
                            {
                                
                                {
                                    foundUser.item_name=foundItem.Fname;
                                    foundUser.total_Cost= q*foundItem.Fcost;
                                    foundUser.save(function(err,data)
                                    {
                                        if(err) console.log(err);
                                        else
                                        {
                                            console.log(data);
                                        }
                                    })
                                } 
                            }
                        })
                    }
                }
            }); 
        }   
    
        else if(it=="Fee_Dept")
        {
            Fee_Items.findOne({FeeID:i},function(err,foundItem)
            {
                if(err) console.log(err);
                else
                {
                    var post=foundItem._id;
                    
                    if(foundItem==null) res.render("newtransaction",{x:2});
                    else
                    {
                        Transactions.findOne({Time:t,Category:it},function(err,foundUser)
                        {
                            if(err) console.log("Error");
                            else if(foundUser==null) console.log("Null boy");
                            else
                            {
                                {
                                    foundUser.item_name=foundItem.Feename;
                                    foundUser.total_Cost= q*foundItem.Feecost;
                                    foundUser.save(function(err,data)
                                    {
                                        if(err) console.log(err);
                                        else
                                        {
                                            console.log(data);
                                        }
                                    })
                                } 
                            }
                        })
                    }
                }
            }); 
        }
        else
        {
            C_Items.findOne({CID:i},function(err,foundItem)
            {
                if(err) console.log(err);
                else
                {  
                    if(foundItem==null) res.render("newtransaction",{x:2});
                    else
                    {
                        var post=foundItem._id;
                        
                        Transactions.findOne({Time:t,Category:it},function(err,foundUser)
                        {
                            if(err) console.log(err);
                            else if(foundUser==null) console.log("Null boy");
                            else
                            {
                                if(foundItem==null) res.render("newtransaction",{x:2});
                                else
                                {  
                                    {
                                        foundUser.item_name=foundItem.Cname;
                                        foundUser.total_Cost= q*foundItem.Ccost;
                                        foundUser.save(function(err,data)
                                        {
                                            if(err) console.log(err);
                                            else
                                            {
                                                console.log(data);
                                            }
                                        })
                                    } 
                                }
                            }
                        });
                    }
                }
            }); 
        }

}
// NEW TRANSACTION POST PROCESSING TAKES PLACE HERE
router.post("/",function(req,res){
    var it=req.body.item;
    var i=req.body.ID;
    var t= new Date();
    var q=req.body.quantity;
    var r=req.body.RFID;
    var totalcost;
    if(i.toString().length==0 || q.toString().length==0 ||  r.length==0)
    {
        res.render("newtransaction",{x:2});
    }
    else{
    //BELOW CODE IS TO UPDATE STUDENT BALANCE
        if(it=="Food")
        {
            Items.findOne({FID:i},function (err,foundItem)
            {
                if(foundItem==null) res.render("newtransaction",{x:2});
                else
                {
                    totalcost=foundItem.Fcost * q;
                    Student.findOne({RFID:r},function(err,foundUser)
                    {   
                        if(foundUser==null) res.render("newtransaction",{x:2});
                        else
                        {
                        var bal = foundUser.Balance;
                            if(bal-totalcost<50)
                                res.render("newtransaction",{x:3});
                            else
                            {  
                                transacCreate(it,i,t,q,r,totalcost);
                                foundUser.Balance = bal-totalcost;
                                foundUser.save(function(err,data)
                                    {
                                        if(err) console.log(err);
                                        else res.render("newtransaction",{x:1});
                                    });
                            }
                        }
                    });
                }
            });
        
        }   
        else if(it=="Library")
        {
            L_Items.findOne({LID:i},function (err,foundItem)
            {
                if(foundItem==null) res.render("newtransaction",{x:2});
                else
                {
                    totalcost=foundItem.Lcost * q;
                    Student.findOne({RFID:r},function(err,foundUser)
                    {
                        if(foundUser==null) res.render("newtransaction",{x:2});
                        else
                        {
                        var bal = foundUser.Balance;
                            if(bal-totalcost<50)
                                res.render("newtransaction",{x:3});
                            else
                            {  
                                transacCreate(it,i,t,q,r,totalcost);
                                foundUser.Balance = bal-totalcost;
                                foundUser.save(function(err,data)
                                    {
                                        if(err) console.log(err);
                                        else res.render("newtransaction",{x:1});
                                    });
                            }
                        }
                    });
                }
            });
        }
        else if(it=="Fee_Dept")
        {
            Fee_Items.findOne({FeeID:i},function (err,foundItem)
            {
                if(foundItem==null) res.render("newtransaction",{x:2});
                else
                {
                    totalcost=foundItem.Feecost * q;
                    Student.findOne({RFID:r},function(err,foundUser)
                    {
                        if(foundUser==null) res.render("newtransaction",{x:2});
                        else
                        {
                        var bal = foundUser.Balance;
                            if(bal-totalcost<50)
                                res.render("newtransaction",{x:3});
                            else
                            {  
                                transacCreate(it,i,t,q,r,totalcost);
                                foundUser.Balance = bal-totalcost;
                                foundUser.save(function(err,data)
                                    {
                                        if(err) console.log(err);
                                        else res.render("newtransaction",{x:1});
                                    });
                            }
                        }
                    });
                }       
            });
        }
        else{
            C_Items.findOne({CID:i},function (err,foundItem)
            {
                if(foundItem==null) res.render("newtransaction",{x:2});
                else
                {
                    totalcost=foundItem.Ccost * q;
                    Student.findOne({RFID:r},function(err,foundUser)
                    {
                        if(foundUser==null) res.render("newtransaction",{x:2});
                        else
                        {
                        var bal = foundUser.Balance;
                            if(bal-totalcost<50)
                                res.render("newtransaction",{x:3});
                            else
                            {  
                                transacCreate(it,i,t,q,r,totalcost);
                                foundUser.Balance = bal-totalcost;
                                foundUser.save(function(err,data)
                                    {
                                        if(err) console.log(err);
                                        else res.render("newtransaction",{x:1});
                                    });
                            }
                        }
                    });
                }
            });
        }
    }
});
module.exports = router;

