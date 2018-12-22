var express          =    require("express"),
    app              =    express(),
    Campground       =    require("./models/campground.js"),
    Comment          =    require("./models/comment.js"),
    User             =    require("./models/user.js"),
    bodyParser       =    require("body-parser"),
    mongoose         =    require("mongoose"),
    seedDB           =    require("./seed"),
    passport         =    require("passport"),
    LocalStrategy    =    require("passport-local"),
    methodOverride   =    require("method-override"),
    campgroundroute  =    require("./route/campground.js"),
    commentroute     =    require("./route/comment.js"),
    authroute        =    require("./route/auth.js"),
    flash            =    require("connect-flash"),
    ejs              =    require('ejs'),
    http             =    require('http');

    var server      =    http.Server(app);
    var io          =    require('socket.io')(server);
    

//To make sample we can use seed data
    //seedDB();
    
    
app.set("view engine","ejs");

var url= process.env.DATABASEURL||"mongodb://localhost:27017/yelpcam_v6";
mongoose.connect(url);



// for accessible to all route===
app.use(methodOverride("_method"));

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname+'/public'));
app.use(express.static('public'));

app.use(require("express-session")({
   secret:"Once Upon a time in mumbai",
   resave: false,
   saveUninitialized:false
}));


//configure Passport==========
//To send data to all route we use models
// Use Flash Message===
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(
   User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next)
{
   res.locals.currentUser=req.user;
   res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
  
   next();
});

app.use("/campgrounds",campgroundroute);
app.use(commentroute);
app.use("/",authroute);


//Make io connection===
io.on('connection',function(socket)
  {
   socket.on('chat',function (data) {
       io.sockets.emit('chat',data);
   });
   console.log("listening to both "+socket.id);
  })
  //listening server
  server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  var address = server.address();
  console.log("Chat server running at", address.address + ":" + address.port);
});