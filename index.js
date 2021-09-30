const express = require('express');
const bodyParser = require('body-parser')
const adress = require('./routes/adress')
const search = require('./routes/search')
const auth = require('./routes/auth')
const cors = require('cors');
const cookieParser = require('cookie-parser');

const  { graphqlHTTP } = require('express-graphql');
const  { buildSchema } = require('graphql');

require('dotenv').config()

const app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cookie");
    res.header("Access-Control-Allow-Credentials", true);
    next()
});

const allowedOrigins = [
    'http://localhost:8080',
    'http://church-members-admin.s3-website-us-east-1.amazonaws.com/production'];

app.use(cors({
    origin: function(origin, callback){
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({extended:false}))

function listenServer() {
    const PORT = 3000
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

if(process.env.NODE_ENV == 'dev') {
    listenServer()
}

app.get('/', (req, res) => {
    res.status(200).send('hello world!');
});

app.get('/cep', (req, res) => {
    let timeNow = Date(Date.now());
    res.status(200).send(timeNow.toString());
});

app.get('/ufs',adress.getUfs);

app.get('/cities',adress.getCities);

app.get('/search',search.getMembers);

app.get('/zipcode',adress.getZipCode);

app.post('/auth',auth.login);

module.exports = app;