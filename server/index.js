const express = require('express');
const app = express();
const PORT = process.env.PORT || process.argv[2] || 8080;
const jwt = require("jsonwebtoken");
const cors = require('cors');
const bcrypt = require('bcrypt');

const User = require('./models/user');

app.use(express.json());
app.use(cors());

require('dotenv').config();

const { authorize } = require("./Utils/authorize");

const detailsoutes = require('./Routes/details');
const listRoutes = require('./Routes/list');
const profileRoutes = require('./Routes/profile');

const JWT_KEY = process.env.JWT_KEY;

//end point for stock details
app.use('/', detailsoutes);

// A Basic Signup end point
app.post('/signup', (req, res) => {
    console.log(req.body);
    const { name, username, password } = req.body
    //const users = readData(userDataPath);
    //gen hash password
    bcrypt.hash(password, 10, function (err, hash) {
        // create new user and store in database.
        new User({
            name: name,
            username: username,
            password: hash,
        })
            .save()
            .then(newUser => {
                console.log(newUser);
                return res.status(201).json({ success: 'true' });
            });
    })
});

// A Basic Login end point
app.post('/login', (req, res) => {
    const { username, password } = req.body
    User
        .where({ username: username })
        .fetch()
        .then(user => {
            if (user) {
                //To check password
                bcrypt.compare(password, user.attributes.password, function (err, result) {
                    if (result) {
                        const payload = { id: user.id };
                        const token = jwt.sign(payload, JWT_KEY)
                        return res.status(200).json({ token });
                    } else {
                        return res.status(403).json({ message: 'Invalid username or password', success: false });
                    }
                });
            }
            else {
                return res.status(403).json({ message: 'Invalid username or password', success: false });
            }
        });
});

//end point for profile info
app.use('/',  profileRoutes)

//end point for stock details
app.use('/', authorize, listRoutes);

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});