import express from "express";
import bodyParser from "body-parser";
//import dotenv from "dotenv"; //help us use process.env.
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from 'cors';

require("dotenv").config();

let app = express(); // instance of app express

const corsOptions = {
    origin: process.env.URL_REACT,
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));


viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.port || 8000;

app.listen(port, () => {
    console.log("Backend NodeJS is running with port: " + port);
});