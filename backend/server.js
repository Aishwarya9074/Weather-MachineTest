import express from "express";
import mongoose from "./db/db.js";
// import router from "./routes/index.js";
import dotenv from 'dotenv'
import bodyParser from 'body-parser';

import cors from "cors";
import router from "./routes/index.js";
dotenv.config({path:'./.env'})

const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(router)

app.listen(process.env.PORT, () => {
  console.log("App is running @http://localhost:8000/");
});
