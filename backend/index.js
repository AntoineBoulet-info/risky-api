const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoute = require('./routes/user.routes')
const IA1 = require('./IA1.json');
const IA2 = require('./IA2.json');

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

app.get('/api/IA1', (req,res) => {
    res.status(200).json(IA1)
})

app.get('/api/IA2', (req,res) => {
    res.status(200).json(IA2)
})


//User API
app.use('/api', userRoute)


module.exports = app;
