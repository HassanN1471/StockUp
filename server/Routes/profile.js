const express = require('express');
const router = express.Router();
const axios = require('axios');
const User = require('../models/user');
const { URL, TOKEN } = require('../Utils/urlAPI');

// A Profile end-point that will return user information,
// The authorize middleware function must check for
// a token, verify that the token is valid, decode
// the token and put the decoded data onto req.decoded
router.get('/profile', (req, res) => {
    const data = req.decoded;
    //console.log("id", data.id);
    //fetch user from database
    User
        .where({ id: data.id })
        .fetch()
        .then(user => {
            if (user) {
                return res.json({ name: user.attributes.name, symbols: JSON.parse(user.attributes.symbols) })
            }
            else {
                return res.status(404).json({ message: 'User not found.' });
            }
        })
});

router.get('/profile/changes', (req, res) => {
    const data = req.decoded;
    //console.log("id", data.id);
    User
        .where({ id: data.id })
        .fetch()
        .then(user => {
            if (user) {
                const symbolsString = `${user.attributes.symbols}`.split('[]').join("");
                const url = `${URL}/stable/stock/market/batch?types=previous,price&symbols=${symbolsString}&token=${TOKEN}`
                axios.get(url)
                    .then(({ data }) => {
                        //refromat data
                        const symbolsData = Object.keys(data).map(item => {
                            const reformData = ((data[item].price - data[item].previous.close) / data[item].previous.close * 100).toFixed(2);
                            return { symbol: item, change: reformData }
                        });
                        console.log(symbolsData);
                        // return res.json({ name: user.attributes.name, symbols: JSON.parse(user.attributes.symbols) })
                        return res.json(symbolsData);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
            else {
                return res.status(404).json({ message: 'User not found.' });
            }
        })
});

//endpoint to add symbol to existing user's info
router.put('/profile/addsymbol', (req, res) => {
    const { symbol } = req.body;
    const data = req.decoded;
    //fetch user from database
    User
        .where({ id: data.id })
        .fetch()
        .then(user => {
            if (user) {
                const updateSymbols = JSON.parse(user.attributes.symbols);
                updateSymbols.push(symbol);
                user.save({
                    name: user.attributes.name,
                    username: user.attributes.username,
                    password: user.attributes.password,
                    symbols: JSON.stringify(updateSymbols)
                });
                return res.json({ name: user.attributes.name, symbols: updateSymbols })
            }
            else {
                return res.status(404).json({ message: 'User not found.' });
            }
        });
});


//endpoint to delete symbol from existing user's info
router.put('/profile/deletesymbol', (req, res) => {
    const { symbol } = req.body;
    const data = req.decoded;
    //fetch user from database
    User
        .where({ id: data.id })
        .fetch()
        .then(user => {
            if (user) {
                const updateSymbols = JSON.parse(user.attributes.symbols)
                    .filter(el => el !== symbol)
                user.save({
                    name: user.attributes.name,
                    username: user.attributes.username,
                    password: user.attributes.password,
                    symbols: JSON.stringify(updateSymbols)
                });
                return res.json({ name: user.attributes.name, symbols: updateSymbols })
            }
            else {
                return res.status(404).json({ message: 'User not found.' });
            }
        });
});

module.exports = router;