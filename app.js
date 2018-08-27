var express         =    require("express"),
    app             =    express(),
    Campground      =    require("./models/campground.js"),
    Comment         =    require("./models/comment.js"),
    User            =    require("./models/user.js"),
    bodyParser      =    require("body-parser"),
    mongoose        =    require("mongoose"),
    seedDB          =    require("./seed"),
    passport        =    require("passport"),
    LocalStrategy   =    require("passport-local"),
    methodOverride  =    require("method-override")
    var campgroundroute  =  require("./route/campground.js");
    var commentroute     =  require("./route/comment.js");
    var authroute        =  require("./route/auth.js");

//To make sample we can use seed data
    //seedDB();
    
    
app.set("view engine","ejs");
// mongoose.connect("mongodb://localhost:27017/yelpcam_v6", { useNewUrlParser: true });
mongoose.connect("mongodb://bihartourism:S848513@#@ds133642.mlab.com:33642/bihartourism", { useNewUrlParser: true });
// For delete and update
app.use(methodOverride("_method"));

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname+'/public'));

app.use(require("express-session")({
   secret:"Once Upon a time in mumbai",
   resave: false,
   saveUninitialized:false
}));


//configure Passport==========
//To send data to all route we use models

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(
   User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next)
{
   res.locals.currentUser=req.user;
   next();
   
});

app.use("/campgrounds",campgroundroute);
app.use(commentroute);
app.use("/",authroute);

//Listen Route=======================================
app.listen(process.env.PORT,process.env.IP,function()
{
   console.log("Resturant server Started"); 
});