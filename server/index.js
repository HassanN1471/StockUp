const express = require('express');
const app = express();
const PORT = process.env.PORT || process.argv[2] || 8080;
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");
const cors = require('cors');

app.use(express.json());
app.use(cors());

require('dotenv').config();

const API_TOKEN = process.env.API_TOKEN;
const API_TOKEN_SANDBOX = process.env.API_TOKEN_SANDBOX;

const API_URL = 'https://cloud.iexapis.com';
const API_URL_SANDBOX = 'https://sandbox.iexapis.com';

const userDataPath = './Data/userData.json';
const { readData, writeData } = require("./Utils/read-write");
const { reformatDataForList } = require("./Utils/reformatData");
const { indexOfItemID } = require("./Utils/indexOfItemID");

const detailsoutes = require('./Routes/details');
const listRoutes = require('./Routes/list');


app.use('/', detailsoutes);
app.use('/', listRoutes);

const JWT_KEY = process.env.JWT_KEY;

function authorize(req, res, next) {
  // Logic for getting the token and
  // decoding the contents of the token. The
  // decoded contents should be placed on req.decoded
  // If the token is not provided, or invalid, then
  // this function should not continue on to the
  // end-point.
  console.log(req.headers.authorization);
  const tokenString = req.headers.authorization;
  const token = tokenString ? tokenString.split(' ')[1] : '';
  if (token.length > 0) {
    jwt.verify(token, JWT_KEY, (err, decodedData) => {
      if (err) {
        return res.status(403).json({ message: 'Token invalid or expired' });
      } else {
        req.decoded = decodedData;
        next();
      }
    })
  }
  else {
    return res.status(403).json({ message: 'Not authorized to access this.' });
  }
}

// Some Basic Sign Up Logic. Take a username, name,
// and password and add it to an object using the 
// provided username as the key
app.post('/signup', (req, res) => {
  const { username, name, password } = req.body
  const users = readData(userDataPath);
  users.push({
    name,
    username,
    password,// NOTE: Passwords should NEVER be stored in the clear like this. Use a library like bcrypt to Hash the password. For demo purposes only.
    id: uuidv4(),
    symbols:[]
  });
  writeData(userDataPath,users);
  console.log(users);
  return res.status(201).json({ success: 'true' })
});

// A Basic Login end point
app.post('/login', (req, res) => {
  const { username, password } = req.body
  const users = readData(userDataPath);
  const user = users.find(user => user.username === username);
  if (user && user.password === password) {
    const payload = { id: user.id };
    const token = jwt.sign(payload, JWT_KEY)
    return res.status(200).json({ token });
  } else {
    return res.status(403).json({ message: 'Invalid username or password', success: false })
  }
});


// A Profile end-point that will return user information,
// The authorize middleware function must check for 
// a token, verify that the token is valid, decode
// the token and put the decoded data onto req.decoded
app.get('/profile', authorize, (req, res) => {
  const data = req.decoded;
  console.log("id",data.id);
  const users = readData(userDataPath);
  const userData = users.find(user => user.id === data.id);
  if(!userData) return res.status(404).json({ message: 'User not found.' });
  console.log(userData);
  return res.json({name:userData.name, symbols:userData.symbols})
});

//endpoint to add symbol to existing user's info
app.put('/profile/addsymbol', authorize, (req, res) => {
  const data = req.decoded;
  const users = readData(userDataPath);
  const index = indexOfItemID(users, data.id);
  if (index===-1) return res.status(404).json({ message: 'User not found.' });
  users[index].symbols.push(req.body.symbol);
  const userData = users[index];
  writeData(userDataPath,users);
  return res.json({name:userData.name, symbols:userData.symbols})
});


//endpoint to delete symbol from existing user's info
app.put('/profile/deletesymbol', authorize, (req, res) => {
  const data = req.decoded;
  console.log("id",data.id);
  console.log(req.body);
  const users = readData(userDataPath);
  indexUser = indexOfItemID(users, data.id);
  console.log(indexUser);
  if (indexUser===-1) return res.status(404).json({ message: 'User not found.' });
  const indexSymbol = users[indexUser].symbols.findIndex(el => el === req.body.symbol);
  console.log(indexSymbol);
  if (indexSymbol===-1) return res.status(404).json({ message: 'Symbol not found.' });
  users[indexUser].symbols.splice(indexSymbol,1);
  const userData = users[indexUser];
  console.log(users);
  writeData(userDataPath,users);
  return res.json({name:userData.name, symbols:userData.symbols})
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
