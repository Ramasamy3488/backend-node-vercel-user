const express = require('express');
const cors = require('cors');
require('dotenv').config();
const conn = require('./db')

conn.connectToMongoDB();

const app = express();

app.use(cors());

app.use(express.urlencoded({extended: false}));

app.use(express.json());

const userRouters = require('./routers/userRouters');

// app.get('/', (req,res)=>{
//     res.json('hello')
// })

app.use('/v1/api', userRouters);

app.listen(process.env.PORT, ()=>{
    console.log(`server is running on ${process.env.PORT}`);
    
})

