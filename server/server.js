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


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/html/index.html'))
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/html/login.html'))
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/html/register.html"))
})

app.post('/writeData', (req, res) => {
    const userToken = req.body.token
    const data = req.body.data;
    const userDB = JSON.parse(fs.readFileSync('./server/database/users.json'))
    const userMedicineData = JSON.parse(fs.readFileSync('./server/database/userData.json'))

    const foundUser = userDB.find(user => user.session_token === userToken);
    if (foundUser) {
        try {
            const user = userMedicineData.find(user => user.username === foundUser.username);
            if (user) {
                user.data = data;
                fs.writeFileSync("./server/database/userData.json", JSON.stringify(userMedicineData))
            } else {
                const userDataObject = {
                    username: foundUser.username,
                    data: data
                }
                userMedicineData.push(userDataObject)
                fs.writeFileSync("./server/database/userData.json", JSON.stringify(userMedicineData))
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                error: error
            })
        }
    }


})

app.get('/retrieveData', (req, res) => {
    const session_token = req.query.token
    const userDB = JSON.parse(fs.readFileSync('./server/database/users.json'))
    const userMedicineData = JSON.parse(fs.readFileSync('./server/database/userData.json'))
    const foundUser = userDB.find(user => user.session_token === session_token);
    var userData;
    
    if(foundUser){
        try {
            const user = userMedicineData.find(user => user.username === foundUser.username);
            if (user) {
                userData = user.data 
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                error: error
            })
        }
    }
    
    res.json(userData)
})

app.use('/', authRoutes)


app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
