const express = require("express");
const connectDB = require("./config/database");
const { User } = require("./models/user");

const bcrypt = require("bcrypt");
const { validateSignUpData } = require("./utils/validation");
// const {adminAuth } = require('./middlewares/auth');

const app = express();

//  to read the json to object
app.use(express.json());

app.post("/signup", async (req, res) => {
  // console.log(req.body);

  try {
    validateSignUpData(req);
    const { firstName,lastName, email, password } = req.body;

    // Encrypting Password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      
    });
    await user.save();
    res.send("User Added SuccessFully");
  } catch (err) {
    res.status(400).send(`Error Saving the User: ${err.message}`);
  }
});

// login api 
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User Not Found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid Credentials");
    }
    res.send("User Logged In Successfully");
  } catch (err) {
    res.status(400).send(`Error Saving the User: ${err.message}`);
  }
});

// get api find by one
app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const users = await User.findOne({ email: userEmail });
    if (userEmail.lenght === 0) {
      return res.status(400).send("User Not Found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send(`Error Saving the User: ${err.message}`);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(400).send(`Error Saving the User: ${err.message}`);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send("User Deleted Successfully");
  } catch (err) {
    res.status(400).send(`Error Saving the User: ${err.message}`);
  }
});
app.patch("/user/:userId", async (req, res) => {
  const userId = req?.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age"];
    const isUpdateAllowed = Object.keys(data).every((k) => {
      ALLOWED_UPDATES.includes(k);
    });
    if (!isUpdateAllowed) {
      return res.status(400).send("Invalid Update");
    }

    if (data.skills.length > 10) {
      return res.status(400).send("Skills should be less than 10");
    }

    await User.findByIdAndUpdate({ _id: userId }, data);
    res.send("User Updated Successfully");
  } catch (err) {
    res.status(400).send(`Error Saving the User: ${err.message}`);
  }
});

const PORT = 7777 || "";
connectDB()
  .then(() => {
    console.log("Database is connected");
    // for eslablish conntection will do app.listen here
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT} successfully`);
    });
  })
  .catch((err) => {
    console.log("DB is not connected", err);
  });

// app.use('/admin' ,adminAuth)

// // if u want to authorised that api means without token no one can access
// // we need to use middleware or we can add one by one
// // one by one will be the complex task so we use middleware
// // middleware is a function that will be called before the actual function

// app.get('/admin/getAllData', (req,res) => {
//     res.send("All Data Send")
// })

// app.get('/admin/delete', (req, res) => {
//     res.send(" Data Deleted Successfully")
// })

// server handler

// this will only handle get call
// app.get ('/user' ,(req,res) => {
//     res.send('hello user');
// });

// route handler

// app.use('/user',
// [(req,res,next) => {
//     // res.send('hello user');
//      console.log("hello");
//      next();

// },
// (req,res)=>{
//     res.send('hello user 2');
// }]
// )

//this willl match all the http method API calls
// app.use('/test',(req,res) => {
//     res.send("hello ff from the server");
// })

// app.listen(3000, () => {
//   console.log("server is running on port 3000");
// });
