const express = require('express');
const bodyParser = require('body-parser')
const adress = require('./routes/adress')
const cors = require('cors');
require('dotenv').config()

const app = express()


app.use(cors());
app.use(bodyParser.json())

function listenServer() {
    const PORT = 3000
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

if(process.env.NODE_ENV == 'dev') {
    listenServer()
}

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.get('/', (req, res) => {
    res.status(200).send('hello world!');
});

app.get('/cep', (req, res) => {
    let timeNow = Date(Date.now());
    res.status(200).send(timeNow.toString());
});

app.get('/ufs',adress.getUfs);

app.get('/cities',adress.getCities);

module.exports = app;