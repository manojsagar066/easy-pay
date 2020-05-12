var express = require("express");
var router  = express.Router();
var Items = require("../models/f_items");
var C_items = require("../models/conveno_items");
var Fee_items = require("../models/fee_items");
var L_items = require("../models/libitems");
var middleware = require("../middleware");
router.get("/",middleware.isLoggedIn,function(req,res){
    res.render("update_item_data",{x:0});
});
router.post("/",function(req,res)
{
    var a = req.body.opt;
    var cost = req.body.cost;
    var item = req.body.item;
    var i = req.body.ID;
    if(cost.toString().length==0 || i.toString().length==0)
    {
        res.render("update_item_data",{x:1});
    }
    else{
        if(a=="update")
        {   
            if(item=="Fee_Dept")
            {
                Fee_Items.findOne({FeeID:i},function(err,foundItem)
                {
                    if(err) console.log(err);
                    else if(foundItem==null) res.render("update_item_data",{x:1});
                    else
                    {  
                        foundItem.Feecost = parseInt(cost) ;
                        foundItem.save(function(err,data)
                        {
                            if(err) console.log(err);
                        });
                        res.render("update_item_data",{x:0});
                    }
                }); 
            }
            else if(item=="Food")
            {
                Items.findOne({FID:i},function(err,foundItem)
                {
                    if(err) console.log(err);
                    else if(foundItem==null) res.render("update_item_data",{x:1});
                    else
                    {  
                        foundItem.Fcost = parseInt(cost);
                        foundItem.save(function(err,data)
                        {
                        if(err) console.log(err);
                        });
                        res.render("update_item_data",{x:0});
                    }
                }); 
            }
            else if(item=="Library")
            {
                L_Items.findOne({LID:i},function(err,foundItem)
                {
                    if(err) console.log(err);
                    else if(foundItem==null) res.render("update_item_data",{x:1});
                    else
                    {  
                        foundItem.Lcost= parseInt(cost);
                        foundItem.save(function(err,data)
                        {
                        if(err) console.log(err);
                        });
                        res.render("update_item_data",{x:0});
                    }
                }); 
            }
            else
            {
                C_Items.findOne({CID:i},function(err,foundItem)
                {
                    if(err) console.log(err);
                    else if(foundItem==null) res.render("update_item_data",{x:1});
                    else
                    {  
                        foundItem.Ccost= parseInt(cost);
                        foundItem.save(function(err,data)
                        {
                            if(err) console.log(err);
                        });
                        res.render("update_item_data",{x:0});
                    }
                }); 
            }
        }
        else
        {
            if(item=="Food")
            {
                Items.deleteOne({FID:i},function(err)
                {
                    if(err) console.log("Err in item update "+err);
                    else res.render("update_item_data",{x:0});
                });
            }
            else if(item=="Library")
            {
                L_Items.deleteOne({LID:i},function(err)
                {
                    if(err) console.log("Err in item update "+ err);
                    else res.render("update_item_data",{x:0});
                });
            }
            else if(item=="Fee_Dept")
            {
                Fee_Items.deleteOne({FeeID:i},function(err)
                {
                    if(err) console.log("Err in item update "+ err);
                    else res.render("update_item_data",{x:0});
                });
            }
            else
            {
                C_Items.deleteOne({CID:i},function(err)
                {
                    if(err) console.log("Err in item update "+ err);
                    else res.render("update_item_data",{x:0});
                });
            }
        }
        
}
});
module.exports = router;