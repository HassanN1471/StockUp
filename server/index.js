const express = require('express');
const app = express();
const PORT = process.env.PORT || process.argv[2] || 8080;
const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");
const cors = require('cors');
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(cors());

require('dotenv').config();

const userDataPath = './Data/userData.json';
const { readData, writeData } = require("./Utils/read-write");

const { authorize } = require("./Utils/authorize");

const detailsoutes = require('./Routes/details');
const listRoutes = require('./Routes/list');
const profileRoutes = require('./Routes/profile');

const JWT_KEY = process.env.JWT_KEY;

//end point for stock details
app.use('/', detailsoutes);

// A Basic Signup end point
app.post('/signup', (req, res) => {
    const { username, name, password } = req.body
    const users = readData(userDataPath);
    //gen hash password
    bcrypt.hash(password, 10, function (err, hash) {
        // Store user data.
        users.push({
            name,
            username,
            password: hash,
            id: uuidv4(),
            symbols: []
        });
        writeData(userDataPath, users);
        console.log(users);
        return res.status(201).json({
            success: 'true'
        });
    })
});

// A Basic Login end point
app.post('/login', (req, res) => {
    const { username, password } = req.body
    const users = readData(userDataPath);
    const user = users.find(user => user.username === username);
    //To check password
    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            const payload = { id: user.id };
            const token = jwt.sign(payload, JWT_KEY)
            return res.status(200).json({ token });
        } else {
            return res.status(403).json({ message: 'Invalid username or password', success: false })
        }
    });

});

//end point for profile info
app.use('/', authorize, profileRoutes)

//end point for stock details
app.use('/', authorize, listRoutes);

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
