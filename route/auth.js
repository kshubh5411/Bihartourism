var express =     require("express");
var router  =     express.Router();
var User    =     require("../models/user.js");
var passport=     require("passport");

//Auth Route==================

//1.Register or Signup Route====

router.get("/",function(req,res)
{
   res.render("landingpage");
});

router.get("/register",function(req, res) {
   res.render("register"); 
});
router.post("/register",function(req, res) {
   

   
   var newUser= new User({username:req.body.username});
   console.log(newUser);
   User.register(newUser,req.body.password,function(err,user)
   {
      if(err)
      {
         console.log("NOT REGISTER");
         return res.render("register");
      }
      passport.authenticate("local")(req,res,function()
         {
            console.log("ALready");
            res.redirect("/campgrounds");
         });
   });
   
});

//Login Page Route=========

router.get("/login",function(req, res) {
   res.render("login"); 
});

//check is this user exist or not using middleware====
router.post("/login",passport.authenticate("local",
{successRedirect:"/campgrounds",
 failureRedirect:"/login"}),function(req, res){
});

//LogOut Route==============

router.get("/logout",function(req, res) {
   req.logout();
   res.redirect("/");
});
module.exports=router;