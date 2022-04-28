const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoute = require('./routes/user.routes')
const confronts = require('./confronts.json');

//appel de MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/risky')
    .then((x) => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    })
    .catch((err) => {
        console.error('Error connecting to mongo', err.reason)
    })

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log('Listening on port ' + port)
})


app.use(express.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    }),
)
app.use(cors());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('invalid endpoint')
})

// error handler
app.use(function (err, req, res, next) {
    console.error(err.message)
    if (!err.statusCode) err.statusCode = 500
    res.status(err.statusCode).send(err.message)
})

app.get('/confronts', (req,res) => {
    res.status(200).json(confronts)
})

app.get('/confronts/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const confront = confronts.find(confront => confront.id === id)
    res.status(200).json(confront)
})

app.post('/confronts', (req,res) => {
    confronts.push(req.body)
    res.status(200).json(confronts)
})


//User API
app.use('/api', userRoute)


module.exports = app;
