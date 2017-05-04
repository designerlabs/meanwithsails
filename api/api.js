var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/User.js');
var jwt = require('jwt-simple');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');
var request = require('request');


var app = express();


function sqlDB() {
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'disign',
        password : '',
        database : 'disigndb'
    });
    return connection;
}
// var connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'disign',
//     password : '',
//     database : 'disigndb'
// });

var objBD = sqlDB();
objBD.query('SELECT * from campaigntbl', function(err, rows, fields) {
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
});


objBD.end();

app.use(bodyParser.json());
app.use(passport.initialize());

passport.serializeUser(function (user, done){
    done(null, user.id);
})

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

var strategyOptions = {
        usernameField: 'email'
    };

var localStrategy = new LocalStrategy(
    strategyOptions,
    function(email, password, done){

        var searchUser = {
            email:email
        };
         User.findOne(searchUser, function(err, user){
            if(err) return done(err)
            
            if(!user){
                return done(null, false, {message: 'Wrong email/password'});
            }
            user.comparePasswords(password, function(err, isMatch){
                if(err) return done(err)

                if(!isMatch)
                    return done(null, false, {message: 'Wrong email/password'});
                
               return done(null, user);
            });
        })
    });

var registerStrategy = new LocalStrategy(
    strategyOptions,
    function(email, password, done){

        var searchUser = {
            email:email
        };
         User.findOne(searchUser, function(err, user){
            if(err) return done(err)
            
            if(user){
                return done(null, false, {message: 'email already exists'});
            }


            var newUser = new User({
                email: email,
                password: password
            });

            newUser.save(function(err){
            done(null, newUser);
            })
        });
});


var campaignStrategy = new LocalStrategy(
    strategyOptions,
    function(req, email, password, done){
    
    var sqlDBconn = sqlDB();
    console.log(req.body);
    var postData  = {
        user_id: req.body.user_id,
        cmgn_name: req.body.cmgn_name,
        cmgn_desc: req.body.cmgn_desc,
        cmgn_layout:req.body.cmgn_layout,
        cmgn_pair_with: req.body.cmgn_pair_with,
        cmgn_data: req.body.cmgn_data 
    };

    sqlDBconn.query('INSERT INTO campaigntbl SET ?', postData, function(err, result) {
        if (!err)
            console.log('The solution is: ', result);
        else
            console.log(err);
    });

    
    sqlDBconn.end();

 

});

passport.use('local-register', registerStrategy);
passport.use('local-login', localStrategy);
passport.use('local-compaignsave', campaignStrategy);

app.post('/register', passport.authenticate('local-register'), function(req, res){
    createSendToken(req.user, res);
});


app.post('/login', passport.authenticate('local-login'), function(req, res){
    createSendToken(req.user, res);
});

app.post('/compaign/add', passport.authenticate('local-compaignsave'), function(req, res){
   
     createSendToken(req.user, res);

    // createSendToken(req.user, res);
});

function createSendToken(user, res){
     var payload = {
        sub: user.id
    }

    var token = jwt.encode(payload, "shhh...");

    res.status(200).send({
        user: user.toJSON(),
        token: token 
    });
}
var jobs = [
    'sridhar',
    'thamarai selvi',
    'dhanvanth',
    'kathyayini'
];

app.get('/campaign', function(req, res){
    if(!req.headers.authorization){
        return res.status(401).send({message: 'You are not authorized'})
    }

    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, "shhh...");

    if(!payload.sub){
        return res.status(401).send({message:'Authorization failed'});
    }
    
    res.json(jobs);
})

app.post('/auth/google', function(req, res){


    var url = "https://accounts.google.com/o/oauth2/token";
    var apiUrl = "https://www.googleapis.com/plus/v1/people/me/openIdConnect";

    var params = {
        client_id: req.body.clientId,
        redirect_uri: req.body.redirectUri,
        code: req.body.code,
        grant_type: 'authorization_code',
        client_secret: '6CTel47QBnkQIYRkFOM5J4S_'
    }
    console.log(req.body.code);

    request.post(url, {
        json: true,
        form: params
    },function(err, response, token){
        var accessToken = token.access_token;
        var headers = {
            Authorization: 'Bearer ' + accessToken
        }

        request.get({
            url: apiUrl,
            headers: headers,
            json:true
        },
        function(err, response, profile){
           User.findOne({
               googleId: profile.sub
           }, function(err, foundUser){
               console.log("here");
               if(foundUser) return createSendToken(foundUser, res);

               var newUser = new User();
               newUser.googleId = profile.sub;
               newUser.displayName = profile.name;
               newUser.save(function(err){
                   if (err){
                       console.log(err);
                   };
                   
                   createSendToken(newUser, res);
               })
           })
        })
    })
});

mongoose.connect('mongodb://localhost/digitaldb',function(err, db) {
    console.log(db);
  if(!err) {
    console.log("We are connected");
  }
});

var server = app.listen(3000, function(){
    console.log('api listening on ', server.address().port);
});