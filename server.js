require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/dbconnection");
const corsOptions = require("./config/corsOptions");
const campaignsRoutes = require("./routes/campaignRoutes");

const port = process.env.PORT || 5000;

const app = express();

console.log(process.env.NODE_ENV);

// connect to db
connectDB();

// middlewares
app.use(cors(corsOptions));

app.use(express.json());

app.use(morgan("dev"));

// routes
app.use("/api/campaigns", campaignsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route does not exist" });
});

// check conection to db and listen to requests
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${port}`)
  );
});

mongoose.connection.on("error", (err) => {
  console.log("MongoDB connection error: ", err);
});
