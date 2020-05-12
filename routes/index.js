var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
router.get("/",function(req,res){
    res.render("starting_page",{x:0});
});
//home page
router.get("/home",function(req,res){
    res.render("home",{x:1});
});
//register page
router.get("/register",function(req,res){
    res.render("register",{x:1});
});
//registration takes place here
router.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err)
        {   
            console.log(typeof(err.name));
            res.render('register',{x:0});
        }
        passport.authenticate("local")(req, res, function(){
           res.render("home",{x:0});
        });
    });
});
//login page
router.get("/login", function(req, res){
    res.render("login"); 
 });
 //login handelling
 router.post("/login",passport.authenticate("local",
{
    successRedirect: "/home", 
    failureRedirect: "/",
    failureFlash: true
}),function(req, res)
{});
router.get("/logout", function(req, res){
    req.logout();
    res.render("starting_page",{x:1});
});
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
module.exports = router;