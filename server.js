const express = require("express");
const app = express();
app.use(express.json());
const connectDB = require("./config/db.js");
connectDB();

const subusersRoutes = require("./routes/subusersRoutes.js");

const PORT = process.env.PORT || 5050;

app.use("/api/subusers", subusersRoutes);

//////////  multiuser  ///////>>>>>>>
const multiuser = require("./routes/multiuser");
app.use("/api/multiuser", multiuser);
//////////  multiuser  ///////<<<<<<<

//////////  Job Cart  ///////>>>>>>>
const jobcart = require("./routes/jobcart");
app.use("/api/jobcart", jobcart);
//////////  multiuser  ///////<<<<<<<

// app.get("/api/subusers", (req, res) => {
//   if (!res.headersSent) {
//     // Send response only if headers haven't been sent already
//     res.send("Example response");
//   }
// });
/////////////////VVVVVVVVVVVVVVVVVVVVV xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

/////////////////////////^^^^^^^^^^^^^^^^^^^^^^xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
app.get("/", (req, res) => {
  res.send(`Server is running..${PORT} ✌️`);
});

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}👍`));

// xxxxxxxxxxxxxxxxxx^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// const express = require("express");
// const app = express();
// const port = 8000;

// app.use(express.json());

// let users = [];
// console.log("users:", users);
// // Register endpoint
// app.post("/register", (req, res) => {
//   const { username, password, role } = req.body;

//   // Check if user already exists
//   if (users.find((user) => user.username === username)) {
//     return res.status(400).send("User already exists");
//   }

//   // Add new user
//   const newUser = {
//     username,
//     password,
//     role,
//   };
//   users.push(newUser);
//   return res.status(201).send("User created successfully");
// });

// // Login endpoint
// app.post("/login", (req, res) => {
//   const { username, password } = req.body;

//   // Check if user exists
//   const user = users.find((user) => user.username === username);
//   if (!user) {
//     return res.status(400).send("Invalid username or password");
//   }

//   // Check password
//   if (user.password !== password) {
//     return res.status(400).send("Invalid username or password");
//   }

//   // Return user role
//   return res.status(200).json({ role: user.role });
// });

// // Start server
// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });
// app.get("/", (req, res) => {
//   res.send(`Server is running..${port} ✌️`);
// });
