const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const connectDb = require('./config/db');
const authRouter = require("./routes/authRoutes");
const writerRouter = require("./routes/writerRoutes");

dotenv.config();

connectDb();

app.use(cors());

app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.json());


app.use('/api/auth', authRouter);
app.use('/api/writer', writerRouter);



const Port = process.env.PORT || 8000;

app.listen(Port, () => {
    console.log('Listening on port ' + Port);
});