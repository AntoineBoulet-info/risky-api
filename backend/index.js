const express = require('express');
const mongoose = require('mongoose');


//appel de MongoDB
mongoose.connect('mongodb+srv://risky:motdepasse@clusterrisquer.n9rlj.mongodb.net/DataBase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !')); 



//appel de Express
const app = express();
app.use(express.json());


module.exports = app;


