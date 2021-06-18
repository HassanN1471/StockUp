const express = require('express');
const router = express.Router();
const axios = require('axios');
const { reformatDataForList } = require("../Utils/reformatData");

// const API_TOKEN = process.env.API_TOKEN;
//const API_TOKEN_SANDBOX = process.env.API_TOKEN_SANDBOX;
const API_TOKEN_SANDBOX = process.env.API_TOKEN;

// const API_URL = 'https://cloud.iexapis.com';
//const API_URL_SANDBOX = 'https://sandbox.iexapis.com';
const API_URL_SANDBOX = process.env.API_URL;

router.post('/list', (req, res) => {
    console.log(req.body);

    const interval = req.body.interval;
    const symbols = req.body.symbols;

    const url = `${API_URL_SANDBOX}/stable/stock/market/batch?token=${API_TOKEN_SANDBOX}&chartInterval=${interval}&types=intraday-prices&symbols=${symbols}`

    axios.get(url)
        .then(({ data }) => {
            //refromat data to objects with properties of symbol and data
            const list = Object.keys(data).map(item => {
                //reformat data for data needed
                const itemData = data[item]['intraday-prices'].map(item => ({
                    label: item.label,
                    close: item.close,
                }));
                //function to calculate value difference between intervals
                return { symbol: item, data: reformatDataForList(itemData) };
            });
            return res.status(200).json(list);
        })
        .catch(err => {
            //console.error(err);
            return res.status(404).send("Data not found.");
        });
});

module.exports = router;