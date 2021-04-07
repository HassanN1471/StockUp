const express = require('express');
const router = express.Router();
const { readData, writeData } = require("../Utils/read-write");
const { indexOfItemID } = require("../Utils/indexOfItemID");
const userDataPath = './Data/userData.json';

// A Profile end-point that will return user information,
// The authorize middleware function must check for
// a token, verify that the token is valid, decode
// the token and put the decoded data onto req.decoded
router.get('/profile', (req, res) => {
    const data = req.decoded;
    console.log("id", data.id);
    const users = readData(userDataPath);
    const userData = users.find(user => user.id === data.id);
    if (!userData) return res.status(404).json({ message: 'User not found.' });
    console.log(userData);
    return res.json({ name: userData.name, symbols: userData.symbols })
});

//endpoint to add symbol to existing user's info
router.put('/profile/addsymbol', (req, res) => {
    const data = req.decoded;
    const users = readData(userDataPath);
    const index = indexOfItemID(users, data.id);
    if (index === -1) return res.status(404).json({ message: 'User not found.' });
    users[index].symbols.push(req.body.symbol);
    const userData = users[index];
    writeData(userDataPath, users);
    return res.json({ name: userData.name, symbols: userData.symbols })
});


//endpoint to delete symbol from existing user's info
router.put('/profile/deletesymbol', (req, res) => {
    const data = req.decoded;
    const users = readData(userDataPath);
    indexUser = indexOfItemID(users, data.id);
    if (indexUser === -1) return res.status(404).json({ message: 'User not found.' });
    const indexSymbol = users[indexUser].symbols.findIndex(el => el === req.body.symbol);
    if (indexSymbol === -1) return res.status(404).json({ message: 'Symbol not found.' });
    users[indexUser].symbols.splice(indexSymbol, 1);
    const userData = users[indexUser];
    writeData(userDataPath, users);
    return res.json({ name: userData.name, symbols: userData.symbols })
});

module.exports = router;