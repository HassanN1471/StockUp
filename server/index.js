const express = require('express');
const app = express();
const PORT = process.env.PORT || process.argv[2] || 8080;
const cors = require('cors');
require('dotenv').config();

const { readData } = require("./Utils/read-write");

const { reformatDataForList } = require("./Utils/reformatData");

app.use(express.json());
app.use(cors());

app.post('/list',(req,res)=>{
    console.log(req.body);
    const data = readData('./Data/multi-data.json');

    if (!data) {
        return res.status(404).send("Data not found.");
    }
    //refromat data to objects with properties of symbol and data
    const list = Object.keys(data).map(item=>{
        //refromat data for only time and close value
        const itemData = data[item]['intraday-prices'].map(item=>({label:item.label,close:item.close}));
        //function to calculate value difference between intervals
        return ({symbol:item,data:reformatDataForList(itemData)});
    });

    res.status(200).json(list);
})

app.get('/details/:id', (req, res) => {
    console.log(req.params.id);
    const data = readData('./Data/single-data.json');

    if (!data) {
        return res.status(404).send("Data not found.");
    }
    //refromat data to objects with properties of symbol and data
    const list = Object.keys(data).map(item => {
        //refromat data for only time and close value
        const itemData = data[item]['intraday-prices'].map(item => ({
            date: item.date,
            minute: item.minute,
            high: item.high,
            low: item.low,
            open: item.open,
            close: item.close,
            volume: item.volume
        }));
        //function to calculate value difference between intervals
        return { symbol: item, data: itemData };
    });

    res.status(200).json(list);
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}.`);
})