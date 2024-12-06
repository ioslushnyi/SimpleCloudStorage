import express from "express";
//import cors from "cors";
import mongoose from "mongoose";
import config from "config";
import auth from "./routes/auth.js";
import cors from "./middleware/cors.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = config.get("port");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//app.use(cors());
app.use(cors);
app.use("/api/auth", auth);

const start = async () => {
  try {
    await mongoose.connect(config.get("dbURL"));
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (e) {}
};

start();
