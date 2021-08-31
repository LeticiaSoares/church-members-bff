const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}))
//GET
app.get('/', (req, res) => {
    res.status(200).send('hello world!');
});
//GET
//Simply sends the current time
app.get('/time', (req, res) => {
    let timeNow = Date(Date.now());
    res.status(200).send(timeNow.toString());
});
module.exports = app;