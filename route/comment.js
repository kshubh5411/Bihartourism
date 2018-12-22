var express  = require("express");
var router   = express.Router();
var Campground= require("../models/campground.js");
var Comment   = require("../models/comment.js");

//================Comment Route================

router.get("/campgrounds/:id/comment/new",isUserlogin,function(req,res)
{
   Campground.findById(req.params.id,function(err,campground)
   {
      if(err)
      {
          req.flash("error",err.message);
         res.redirect("campground/campgrounds");
      }
      else
      {
       res.render("comment/newcomment",{campground:campground});
      }
   });
   
});
router.post("/campgrounds/:id/comment",isUserlogin,function(req,res)
{
   Campground.findById(req.params.id,function(err, campground) {
      if(err){
          req.flash("error",err.message);
          res.redirect("campground/campgrounds");
      }
      
      else
      {
        Comment.create(req.body.comment,function(err,comment)
        {
           if(err)
           res.redirect("campground/campgrounds");
           else
           {
              
              comment.author.id=req.user._id;
              comment.author.username=req.user.username;
              comment.save();
              campground.comments.push(comment);
              campground.save();
              req.flash("success","Comment Added Successfully");
              res.redirect("/campgrounds/"+campground._id);
           }
        });
         
      }
       
   })
});

//Edit Comment Route===========
router.get("/campgrounds/:id/comment/:comment_id/edit",isOwnerShip,function (req,res) {
   Comment.findById(req.params.comment_id,function(err,foundcomment) {
       if(err)
       req.flash("error",err.message);
       else{
        //   console.log("Comment="+req.params.comment_id);
        //   console.log(foundcomment);
        
           res.render("comment/edit",{campground_id:req.params.id,comment:foundcomment});
       }
       
       
       
   })
    // body...
})

//Post Edited Comment route========
router.put("/campgrounds/:id/comment/:comment_id",function(req,res)
{
   Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedcomment)
   {
       if(err)
       {
           req.flash("error",err.message);
           res.redirect("/campgrounds");
       }
       else
       {
           req.flash("success","Comment Edited");
           res.redirect("/campgrounds/"+req.params.id);
       }
       
   }) ;
});

//Delete comment Route
router.delete("/campgrounds/:id/comment/:comment_id",function(req,res)
{
   Comment.findByIdAndRemove(req.params.comment_id,function(err,deletedData)
   {
       if(err)
       {
           req.flash("error","Not Allowed!!");
          res.redirect("back"); 
       }
       
       else
       {
            req.flash("success","Comment Deleted!!")
            res.redirect("/campgrounds/"+req.params.id);
       }
      
       
   });
});


// MiddleWare for Edit and delete comment ownerShip

function isOwnerShip(req,res,next)
{
    if(req.isAuthenticated())
    {
       Comment.findById(req.params.comment_id,function(err, comment) {
          if(err)
          res.redirect("back");
          else
            {
                if(comment.author.id.equals(req.user._id))
                {
                    next();
                }
                else
                {
                    req.flash("error","Not Allowed!!!");
                   res.redirect("back"); 
                }
            }
           
       });
        
    }
    else
    {
        req.flash("Not Allowed!!!");
        res.redirect("back");
    }
}

// Middleware fun to check user exist or not========
function isUserlogin(req,res,next)
{
   if(req.isAuthenticated())
   return next();
   res.redirect("/login");
}
module.exports=router;