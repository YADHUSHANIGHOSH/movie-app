import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import movieroute from "./routes/movieRoute.js";
import userroute from "./routes/userRoute.js";
import theaterroute from "./routes/theaterRoute.js";
import ticketroute from "./routes/ticketRoute.js";
import adminroute from "./routes/adminRoute.js";
import cors from 'cors';
import theatermoviesroute from "./routes/theatermoviesRoute.js";
import payrouter from "./routes/paymentRoute.js";
import whatsapproute from "./routes/whatsapproute.js";




const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("database is connected");
  })
  .catch((error) => console.log("not connected", error));

  app.use("/api/movie" ,movieroute);
  app.use("/api/user" ,userroute);
  app.use("/api/theater",theaterroute);
  app.use("/api/ticket",ticketroute);
  app.use("/api/admin",adminroute);
  app.use("/api/theatermovies",theatermoviesroute);
  app.use("/api/payment",payrouter);
  app.use("/api/whatsapp",whatsapproute)

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
