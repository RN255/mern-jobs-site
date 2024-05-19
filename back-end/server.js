require("dotenv").config();
console.log(process.env.MONGODB_URI); // remove this after you've confirmed it is working

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const entryRoutes = require("./routes/entryRoutes");
const authRoutes = require("./routes/authRoutes");
const port = process.env.PORT || 5000;
const dbURI = process.env.MONGODB_URI;

// Connect to your MongoDB database
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// allow for JSON request body parsing
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Connect entry and user routes to the app
app.use("/api/entries", entryRoutes);
app.use("/api", authRoutes); // Use the authRoutes for authentication

// Define your API routes and middleware here
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Define a sample route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the server!" });
});