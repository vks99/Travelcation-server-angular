// Importing all required modules
require("dotenv").config();
var cookieParser = require('cookie-parser');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var express  = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
const cors = require('cors');

// Setting cors and mongoose warning
app.use(cors());
app.use(cookieParser()); 
mongoose.set('strictQuery', false);

// importing required schemas
var contactus = require('./models/contactusSchema');
var dest_packages = require('./models/destPackagesScehma');
var feedback = require('./models/feedbackSchema');
var payment = require('./models/paymentSchema');
var home_destinations = require('./models/homeDestinationsSchema');
var travelguides = require('./models/travelGuideSchema');
const auth = require("./middleware/auth");

//importing Blog Form Schema
var blogform = require('./models/blogformSchema');
var User = require('./models/userScheme');

var User = require('./models/userScheme');
const multer = require("multer");

// assigning port no
var port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

// Connection to MongoDB Database
mongoose.connect("mongodb+srv://vikasguptha99:Vik240398@cluster0.0rsfijt.mongodb.net/TravelCationTest", { useNewUrlParser: true });

// routes
app.post("/contactus",async(req, res)=>{
	console.log("inside server");
	const formData = req.body;
	console.log(formData);
	await contactus.create(formData);
	await res.send(true);
});


//route to post the feedback form data
app.post("/home", async(req, res) => {
	console.log(req.body)
	const feedbackdata = req.body;
	await feedback.create(feedbackdata);
	 await res.send("true");
	

}); 
//route to get destination details in homepage from db 
app.get("/home_destinations",async(req, res)=>{
	const dest =  await home_destinations.find();
 	 await res.json(dest);
	});
//route to get Travelguides details in homepage from db 
app.get("/home_travelguides",async(req, res)=>{
	const trvelguide =  await travelguides.find();
 	 await res.json(trvelguide);
	});

app.post("/blogForm", async(req,res)=>{
	const blogData = req.body;
	console.log(blogData);
	await blogform.create(blogData);
	await res.send("true");
})

app.get("/blogs", async(req,res)=>{
	try {
		const posts = await blogform.find();
		console.log(posts);
		res.json(posts);
		
	  } catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Server Error' });
	  }
})
app.get("/history", async(req,res)=>{
	try {
		const posts = await payment.find();
		console.log(posts);
		res.json(posts);
		
	  } catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Server Error' });
	  }
})



//route to set signup inframation to db 
app.post("/register", async (req, res) => {
	try {
	  // Get user input
	  let name = req.body.name;
	  let email = req.body.email;
	  let password = req.body.password;
	  let address = req.body.address;
	  let phone = req.body.phone;

  
	  // Validate user input
	  if (!(email && password && name )) {
		console.log(email);
		console.log(req.body.email);
		console.log("All input is required");
		//res.status(400).send("All input is required");

	  }
  

	  const oldUser = await User.findOne({ email });
  
	  if (oldUser) {
		console.log("User Already Exist. Please Login");
		//return res.status(409).send("User Already Exist. Please Login");
	  }
  
	  //Encrypt user password
	  encryptedPassword = await bcrypt.hash(password, 10);
  
	  // Create user in our database
	  const user = await User.create({
		name,
		address,
		phone,
		email: email.toLowerCase(), // sanitize: convert email to lowercase
		password: encryptedPassword,
	  });
  
	  // Create token
	  const token = jwt.sign(
		{ user_id: user._id, email },
		process.env.TOKEN_KEY,
		{
		  expiresIn: "2h",
		}
	  );
	  // save user token
	  console.log('secuess');
	  res.setHeader('Content-Type', 'application/json');
	  await res.send(JSON.stringify({ token: token }));
	  console.log('secuess2');
	} catch (err) {
	  console.log(err);
	}
  });
//route to set login inframation to db 
 app.post("/login", async (req, res) => {
	try {
	  // Get user input
	  let email = req.body.email;
	  let password = req.body.password;
	  // Validate user input
	  if (!(email && password)) {
		console.log("All input is required");
		//res.status(400).send("All input is required");
	  }
	  // Validate if user exist in our database
	  const user = await User.findOne({ email });
	  console.log(user);
  
	  if (user && (await bcrypt.compare(password, user.password))) {
		// Create token
		const token = jwt.sign(
		  { user_id: user._id, email },
		  process.env.TOKEN_KEY,
		  {
			expiresIn: "2h",
		  }
		);
		res.setHeader('Content-Type', 'application/json');
		await res.send(JSON.stringify({ token: token }));
		console.log("loginsuccess");
	  }
	  //console.log("Invalid Credentials");
	  console.log("loginnotsuccess1");
	  //res.status(400).send("Invalid Credentials");
	} catch (err) {
	  console.log(err);
	  console.log("loginnotsuccess2");
	}
  });


  //route for payment 
  app.post("/Payment", async(req, res) => {
    console.log(req.body)
	const paymentData = req.body;
	await payment.create(paymentData);
	await res.send("true");
  });

app.get("/packages",async(req, res)=>{
const packages =  await dest_packages.find();
  await res.json(packages);
});

// starting the port
app.listen(port);
console.log("App Listening to Port : "+port)