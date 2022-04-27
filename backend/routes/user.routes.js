const express = require('express');
const app = express();
const userRoute = express.Router();
let User = require('../models/User');
// Add User
/*
userRoute.route('/sign-up').post((req, res, next) => {
    User.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});
*/

userRoute.post('/sign-up', (req, res, next) => {
    delete req.body._id;
    const user = new User({
        ...req.body
    });
    user.save()
        .then(() => res.status(201).json({ message: 'Objet User enregistré !', user}))
        .catch(error => res.status(400).json({ error }));
});

userRoute.use('/users', (req, res, next) => {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
});

/*userRoute.route('/login').post((req, res, next) => {
    User.find(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});*/



// Get all User
userRoute.route('/').get((req, res) => {
    User.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})
// Get User
userRoute.route('/read-User/:id').get((req, res) => {
    User.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Update User
userRoute.route('/update-User/:id').put((req, res, next) => {
    User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('User updated successfully!')
        }
    })
})
// Delete User
userRoute.route('/delete-User/:id').delete((req, res, next) => {
    User.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})
module.exports = userRoute;
