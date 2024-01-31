require('dotenv').config()

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs')
const path = require('path')
const cors = require('cors')
const authRoutes = require('./routes/authUsers')


const app = express();
const port = 3000;

// Middleware to parse JSON in the request body
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));
app.use(cors())


app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '../frontend/html/index.html'))
})

app.get('/login', (req, res) =>{
    res.sendFile(path.join(__dirname, '../frontend/html/login.html'))
})

app.get('/register', (req, res) =>{
    res.sendFile(path.join(__dirname, "../frontend/html/register.html"))
})

app.use('/', authRoutes)



app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
