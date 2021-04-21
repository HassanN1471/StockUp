const express = require('express');
const router = express.Router();
const axios = require('axios');

//const API_TOKEN = process.env.API_TOKEN;
const API_TOKEN_SANDBOX = process.env.API_TOKEN_SANDBOX;
//const API_TOKEN_SANDBOX = process.env.API_TOKEN;

//const API_URL = 'https://cloud.iexapis.com';
const API_URL_SANDBOX = 'https://sandbox.iexapis.com';
//const API_URL_SANDBOX = 'https://cloud.iexapis.com';

router.get('/details/:id', (req, res) => {
    //console.log(req.params.id);

    const interval = 5;

    const url = `${API_URL_SANDBOX}/stable/stock/market/batch?token=${API_TOKEN_SANDBOX}&chartInterval=${interval}&types=intraday-prices&symbols=${req.params.id}`

    //console.log(url);

    axios.get(url)
        .then(({ data }) => {
            //refromat data to objects with properties of symbol and data
            const list = Object.keys(data).map(item => {
                //reformat data for data needed
                const itemData = data[item]['intraday-prices'].map(item => ({
                    date: item.date,
                    minute: item.minute,
                    high: item.high,
                    low: item.low,
                    open: item.open,
                    close: item.close,
                    volume: item.volume
                }));
                return { symbol: item, data: itemData };
            });
            return res.status(200).json(list);
        })
        .catch(err => {
            //console.error(err);
            return res.status(404).send("Data not found.");
        });
});

router.get('/details/stats/:id', (req, res) => {
    //console.log(req.params.id);

    const url = `${API_URL_SANDBOX}/stable/stock/${req.params.id}/stats?token=${API_TOKEN_SANDBOX}`

    //console.log(url);

    axios.get(url)
        .then(({ data }) => {
            //reformat data for data needed
            const itemData = {
                companyName:data.companyName,
                avg10Volume:data.avg10Volume,
                avg30Volume:data.avg30Volume,
                week52range: `${data.week52low} - ${data.week52high}`,
                week52change:data.week52change,
                peRatio:data.peRatio,
                beta:data.beta
            };
            return res.status(200).json(itemData);
        })
        .catch(err => {
            //console.error(err);
            return res.status(404).send("Data not found.");
        });
});

module.exports = router;