const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const multer = require( 'multer' );
const port = process.env.PORT || 8080; 
const mongoose   = require( 'mongoose' );
const app = express();
const User     = require( './app/models/user' );

mongoose.connect('mongodb+srv://shriyash:%23Shree2626@cluster0.bsha0.mongodb.net/test_db?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();      

router.use(function(req, res, next) {
    next();
});

router.route('/users')

    .post(function(req, res) {
res.json(req.body);
        var user = new User();
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.phoneNumber = req.body.phoneNumber;
        user.profileImage = req.body.profileImage;

        // save the bear and check for errors
        user.save(function(err) {
            if (err)
                res.send(err);
                res.json({ message: 'User created!' });
            });
    })

    .get(function(req, res) {
        User.find(function(err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });
    });

router.route('/users/:userId')

    .get(function(req, res) {
        User.findById(req.params.userId, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    })

    .put(function(req, res) {

        // use our bear model to find the bear we want
        User.findById(req.params.userId, function(err, user) {
            if (err)
                res.send(err);

            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.email = req.body.email;
            user.contactNumber = req.body.contactNumber;

            user.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'User updated!' });
            });
        });
    })

    .delete(function(req, res) {
        User.remove({
            _id: req.params.userId
        }, function(err, user) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });



app.use('/api', router);

app.listen(port);
console.log( 'Started on ' + port );