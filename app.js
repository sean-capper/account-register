const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const expressValidator = require('express-validator');
const mongojs = require('mongojs');
const db = mongojs('account', ['users']);
const ObjectId = mongojs.ObjectId;

let app = express();

app.use(session({
    secret: '__secret__',
    resave: false,
    saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/public')));

// Global Vars
app.use((req, res, next) => {
    res.locals.errors = null;
    next();
});

app.use(expressValidator());

app.get('/', (req, res) => {
    if(req.session.success) {
        let success = req.session.success;
        delete req.session.success;
        res.render('index', {
            success: success
        });
    }
    else if(req.session.error) {
        let errors = [req.session.error];
        delete req.session.error;
        res.render('index', {
            errors: errors
        });
    } else {
        req.session.error = {msg: ''};
        req.session.success = {msg: ''};
        res.render('index');
    }
});

app.get('/createaccount', (req, res) => {
    res.render('createaccount');
});

app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.redirect('/');
});

app.post('/login', (req, res) => {
    req.checkBody('username', 'Username is required.').notEmpty();
    req.checkBody('password', 'Password is required.').notEmpty();

    let errors = req.validationErrors();

    if(errors) {
        if(req.session.error)
            errors.push(req.session.error);
        console.log(errors);
        console.log(req.session);
        res.render('index', {
            errors: errors
        }); 
    } else {
        let username = (req.body.username).toLowerCase();
        db.users.findOne({username: username}, (err, user) => {
            if(user === null) {
                req.session.error = {msg: 'No account with that username exists!'};
                res.redirect('/');
            } else {
                let hash = user.password;
                bcrypt.compare(req.body.password, hash, (err, doesMatch) => {
                    if(doesMatch) {
                        res.redirect('home');
                    } else {
                        req.session.error = {msg: 'Invalid password. Please try again.'};
                        res.redirect('/');
                    }
                });
            }
        });
    }
});

app.post('/user/register', (req, res) => {
    req.checkBody('username', 'Please enter a unique username.').notEmpty();
    req.checkBody('password', 'Please enter a password.').notEmpty();

    let errors = req.validationErrors();

    if(errors) {
        console.log(errors);
        res.render('createaccount', {
            errors: errors
        });
    } else {
        // salt the password and add the user to the database
        bcrypt.hash(req.body.password, 10, function(err, pass) {
            // consider preventing certain characters like non-alpha/numerical characters
            let username = (req.body.username).toLowerCase();
            let user = {
                username: username,
                password: pass
            };
            db.users.insert(user, (err) => {
                // username already taken should be the only error thrown at this point
                if(err) {
                    console.log(err);
                    res.render('createaccount', {
                        errors: [{
                            msg: 'Username already taken.',
                        }]
                    });
                } else {
                    req.session.success = {msg: `Account '${user.username}' succesfully created.`};
                    res.redirect('/');
                }
            });
        });
    }
});

app.listen(8000, () => {
    console.log('Server started on port 8000...');
});