/**
 * Created by Ankit on 03/04/17.
 */
//require express
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var MemStore = require('session-memory-store')(session);


var app = express();
app.use(session({
    secret: "nfsfisfskfnksnis",
    resave: false,
    saveUninitialized: true,
    store: new MemStore({reapInterval: 60000 * 10})
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//create our router object
var router = express.Router();

//export router

module.exports = router;

//mongoose connect
mongoose.connect('mongodb://localhost/learnnode');
var db = mongoose.connection;
User = require('./models/user_detail')
router.get('/', function (req, res) {

    res.render('signup');
});


//signUp
router.post('/login', function (req, res) {

    var a = req.body.username;
    var b = req.body.password;
    var detail = {"username": a, "password": b};
    User.addUser(detail, function (err, user) {
        if (err) {
            throw err;
        }
        //  res.json(user);
        res.render('login');
    });


});
//login
router.post('/home', function (req, res) {

    var a = req.body.username;
    var b = req.body.password;
    User.findOne({username: a, password: b}, function (err, user) {
        if (err) {
            throw err;
        }
        if (!user) {
            res.send("You are not a valid user");
        }
        if (user) {
            req.session.user = user;
            var user_logged_in = req.session.user;

            User.getData(function (err, user) {
                if (err) {
                    throw err;
                }
                //  res.send(user);
                console.log(user_logged_in.username);
                var data={a:user_logged_in.username};
                res.render('home', {users: user,a:user_logged_in.username});
            });
        }
    });

});
//login with session
router.get('/login', function (req, res) {
    if (!req.session.user) {
        res.render('login');

    }
    else {
        var user_logged_in = req.session.user;
      //  console.log(user_logged_in);

        User.getData(function (err, user) {
            if (err) {
                throw err;
            }
            //  res.send(user);

            res.render('home', {users: user,a:user_logged_in.username});
        });

    }
});
//logout
router.get('/logout', function (req, res) {
    req.session.destroy();
    res.render('login');
})

router.get('/about', function (req, res) {

    var users = [
        {name: "Ankit", email: "ankitmaurya1994@gmail.com"}];
    res.render('about', {users: users});
});