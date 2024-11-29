const express =require('express');
const mongoose  = require('mongoose')
const app=express() 
const cors = require('cors');
const dotenv = require('dotenv')
const cookieParser=require('cookie-parser')
const router = express.Router();
const session = require('express-session')
const jwt = require("jsonwebtoken");
const bodyParser=require('body-parser');
const path = require("path");
const passport = require('passport');
const passportSetup = require('./passport');
const authRoute=require('./routes/auth');
const userRoute=require('./routes/users');
const verifyToken = require('./middleware/verifyToken');
const cookieSession = require("cookie-session");
const resopostRoutes = require("./routes/resoposts");
const resocommentRoutes = require("./routes/resocomments");
const bookMarkRoutes = require('./routes/BookMarks');

//database 
 const connectDB=async()=>{
    try{
        await mongoose.connect("mongodb+srv://chathuabeyrathne2001:Cha9775*@bookreview.2foov.mongodb.net/")
        console.log("database connected ")
    }
    catch(err){
        console.log(err)
    }
}
//middlewares
dotenv.config()
require('./passport');
app.use(express.json())
app.use(cors({
      origin: 'http://localhost:3000',
      methods: "GET, POST, PUT, DELETE",
      credentials: true
    }));
app.use(cookieParser())
app.use(bodyParser.json());

// session
app.use(session({
    secret: process.env.accessToken_secret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false}
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());
  
    app.get("/auth/google",
    passport.authenticate("google", { scope: ['profile'] })
  );
  
  
  app.get("/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/loginError" }),
    function(req, res) {
      // Successful authentication, redirect secrets.
      res.redirect("http://localhost:3000");
    }
  );
  
  app.get('/loginError', function (req, res) {
  
  res.status(500).send('Login process encountered an error. Please try again.');
  });
  
  
  app.get('/checkAuth', verifyToken, (req, res) => {
    res.sendStatus(200);
  })
  
   
  app.use("/api/auth", authRoute);
  app.use("/api/users", userRoute);
  app.use("/api/resoposts", resopostRoutes); // Route for resource posts
  app.use("/api/resocomments", resocommentRoutes);
  app.use("/api/bookMarks", bookMarkRoutes);


app.get("/api/search", async (req, res) => {
  try {
    const query = req.query.q; // Get search query from request

    // Search in ResoPost collection
    const resoResults = await ResoPost.aggregate([
      {
        $search: {
          index: "SearchReso", 
          text: {
            query: query,
            path: {
              wildcard: "*", 
            },
          },
        },
      },
    ]);

 
    // Combine results from both collections
    const combinedResults = [...resoResults];

    res.json(combinedResults); // Send combined search results as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" }); 
  }
});


app.listen(5000,()=>{
    connectDB()
    console.log("app is running on port 5000")
})
