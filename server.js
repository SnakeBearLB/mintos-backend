
// DEPENDENCIES
require("dotenv").config();

const { PORT = 4000, MONGODB_URL } = process.env;

const express = require("express");

const app = express();

const mongoose = require("mongoose");

// Middleware
const cors = require("cors");
const morgan = require("morgan");

// Establish Connection
mongoose.connect(MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

// Connection Events
mongoose.connection
  .on("open", () => console.log("You are connected to mongoose"))
  .on("close", () => console.log("You are disconnected from mongoose"))
  .on("error", (error) => console.log(error));

// // Models
const AssetSchema = new mongoose.Schema({
  name: String,
  image: String,
  $currentDate: {$type: "date"},
});

const Assets = mongoose.model("Assets", AssetSchema);

// to prevent cors errors, open access to all origins
app.use(cors());
// logging
app.use(morgan("dev"));
// parse json bodies
app.use(express.json());

// Routes

// create a test route
app.get('/', (req, res) => {
  res.send("hello world")
});

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))