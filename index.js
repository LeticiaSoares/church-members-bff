const express = require('express');
const bodyParser = require('body-parser')
const adress = require('./routes/adress')
const search = require('./routes/search')
const auth = require('./routes/auth')
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config()

const app = express()

const corsWhitelist = [
    'http://localhost:8080',
    'http://church-members-admin.s3-website-us-east-1.amazonaws.com/',
];

app.use((req, res, next) => {

    if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Cookie');
        res.header("Access-Control-Allow-Credentials", true);
    }

    next();
});

app.use(cors({
    origin: function(origin, callback){
        // allow requests with no origin
        if(!origin) return callback(null, true);
        if(corsWhitelist.indexOf(origin) === -1){
            var message = 'The CORS policy for this origin doesnt ' +
                'allow access from the particular origin.';
            return callback(new Error(message), false);
        }
        return callback(null, true);
    }
}))


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

app.get('/search/:id',search.getMemberById);

app.get('/zipcode',adress.getZipCode);

app.post('/auth',auth.login);

module.exports = app;