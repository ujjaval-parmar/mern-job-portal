const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

const  authController  = require('./controllers/authController')
const  jobController  = require('./controllers/jobController')

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


app.use('/', authController);
app.use('/', jobController);

mongoose.connect(process.env.DATABASE)
    .then(res=> console.log('Mongo Connected!'))
    .catch(err=> console.log('Mongo Connected Failed!: ', err));


app.listen(5000, ()=>{
    console.log('Server Running on http://localhost:5000/')
})