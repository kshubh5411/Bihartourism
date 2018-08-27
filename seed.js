var mongoose   =  require("mongoose"),
    Campground =  require("./models/campground.js"),
    Comment    =  require("./models/comment.js");
    var data=[
        {
            name:"Cloud",
            image:"https://cdn.pixabay.com/photo/2016/06/18/17/42/image-1465348_960_720.jpg",
            description:""
        },
         {
            name:"Cloud",
            image:"https://cdn.pixabay.com/photo/2016/06/18/17/42/image-1465348_960_720.jpg",
            description:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
        },
         {
            name:"Cloud",
            image:"https://cdn.pixabay.com/photo/2016/06/18/17/42/image-1465348_960_720.jpg",
            description:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
        }
        ]
  function seedDB()
  {//Remove all campgrounds===
    Campground.remove({},function(err)
    {
        if(err)
        console.log(err)
        else
        console.log("All data Removed----");
        //add a few campgrounds==== but sometimes remove operate at last
    // data.forEach(function(seed) 
    // {                             //     campground as all data
    //   Campground.create(seed,function(err,campground)
    //   {
    //       if(err)
    //       console.log("Not created");
    //       else
    //       {
    //           console.log("created..");
    //           //create  a comment=====
    //           Comment.create({
    //              text:"This place is great====",
    //              author:"Shubham"
    //           },function(err,comment)
    //           {
    //              if(err)
    //              console.log(err);
    //              else
    //              {
    //                  campground.comments.push(comment);
    //                  campground.save();
    //                  console.log("Created new Comment");
    //              }
    //           });
    //       }
    //   });
        
    // });
    
  });
 }
    
  module.exports=seedDB;