
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


// Models
const AssetSchema = new mongoose.Schema({
  title: String,
  image: String,
  createdAt: { type: Date, default: Date.now }
});

const Assets = mongoose.model("Assets", AssetSchema);

// to prevent cors errors, open access to all origins
app.use(cors());
// logging
app.use(morgan("dev"));
// parse json bodies
app.use(express.json());

// Routes

// test route
app.get('/', (req, res) => {
  res.send("hello world")
});

// asset index route
app.get('/asset', async (req, res) => {
  try {
    // send all assets
    res.json(await Assets.find({}));
  } catch (error) {
    // send error
    res.status(400).json(error);
  }
});

// asset delete route
app.delete('/asset/:id', async (req, res) => {
  try {
    // send all assets
    res.json(await Assets.findByIdAndRemove(req.params.id))
  } catch (error) {
    res.status(400).json(error);
  }
});

// asset create route
app.post('/asset', async (req, res) => {
  try {
    // send all assets
    res.json(await Assets.create(req.body));
  } catch (error) {
    // error
    res.status(400).json(error);
  }
});

// asset edit route
app.put('/asset/:id', async (req, res) => {
  try {
    // send all assets
    res.json(await Assets.findByIdAndUpdate(req.params.id, req.body, { new: true }));
  } catch (error) {
    res.status(400).json(error);
  }
})


app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));

