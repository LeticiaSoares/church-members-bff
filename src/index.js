import express from 'express'
import getUfs from  './routes/adress'

const app = express()
// const PORT = 3000
//
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// })

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.get('/', (req, res) => {
    res.status(200).send('hello world!');
});
app.get('/cep', (req, res) => {
    let timeNow = Date(Date.now());
    res.status(200).send(timeNow.toString());
});

app.get('/ufs', getUfs);

module.exports = app;