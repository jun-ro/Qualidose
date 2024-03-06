const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const fs = require('fs');
const path = require('path')

// Grab the users database

const users =  path.join(__dirname, "../database/users.json")

// Router
const router = express.Router();

// Register endpoint
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Read the current database

        var userdb = JSON.parse(fs.readFileSync(users))
        
        // Check if username or password is missing
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required.' });
        }

        // Check if the username is already taken
        if (userdb.find(user => user.username === username)) {
            return res.status(400).json({ error: 'Username is already taken.' });
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the user to the in-memory database (you might want to use a database in a real-world scenario)
        const newUser = { username, password: hashedPassword };
        userdb.push(newUser);

        // Save to Database

        fs.writeFileSync(users, JSON.stringify(userdb))

        // You can perform additional tasks like storing the user in a database here

        return res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

// Login endpoint
router.post('/login', async (req, res) => {

    // Read the database

    const userdb = JSON.parse(fs.readFileSync(users))
    var token;

    try {
        const { username, password } = req.body;

        // Check if username or password is missing
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required.' });
        }

        // Find the user in the database
        const user = userdb.find(user => user.username === username);

        // Check if the user exists
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }
    
        token = jwt.sign({ username: user.username }, process.env.SECRET_KEY, { expiresIn: '1y' });


        user.session_token = token;

        fs.writeFileSync(users, JSON.stringify(userdb))
        return res.status(200).json({ message: 'Login successful.', token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});


router.get('/getUser', async(req, res) =>{
    const token = req.query.token 
    const userdb = JSON.parse(fs.readFileSync(users))
    
    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const username = decoded.username;
        const user = userdb.find(u =>  u.username === username)
        return res.status(200).json({message: user})
    }catch(error){
        console.log(error)
        return res.status(500).json({error: error})
    }
})

router.get('/getMedImage', async(req, res) =>{
    const medName = req.query.name;

    const meddb = JSON.parse(fs.readFileSync(path.join(__dirname, '../database/pills.json')))
    try{
        const medicineImageURL = meddb[medName]
        return res.status(200).json({message: medicineImageURL})
    }catch(error){
        return res.status(500).json({error: error})
    }
})

module.exports = router;
