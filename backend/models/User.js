const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let User = new Schema({
    id: {
        type: Number
    },
    username: {
        type: String
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

User.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
});



module.exports = mongoose.model('User', User)
