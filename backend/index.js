const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoute = require('./models/User')
const confronts = require('./confronts.json');

//appel de MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/risky')
    .then((x) => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    })
    .catch((err) => {
        console.error('Error connecting to mongo', err.reason)
    })

//appel de Express

app.listen(8080, () => {
    console.log("Serveur à l'écoute")
});


app.use(express.json());

app.get('/api/confronts', (req,res) => {
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

module.exports = app;
