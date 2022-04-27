const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let User = new Schema({
    id: {
        type: Number
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
}, {
    collection: 'users'
})
module.exports = mongoose.model('User', User)
