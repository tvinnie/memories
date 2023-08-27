import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';

// import postroutes
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

//connect to express server
const app = express();
dotenv.config();

// general setup
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors());

//initialize routes
app.use('/posts', postRoutes);
app.use('/user',userRoutes);

// connect to mongo atlas cloud db 
// const CONNECTION_URL = 'mongodb+srv://tri:0ibm.Linux@vincecluster1.zrlrdqv.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`)))
    .catch((error) => console.log(error));
