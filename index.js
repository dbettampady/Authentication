const express = require('express');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const session = require('express-session');

const app = express();
const PORT = 3000;

const hours24 = 24*60*60*1000; //24 hour cookie

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname));

app.use(sessions({
    secret: "thisismysecret",
    saveUninitialized: true,
    cookie: {maxAge: hours24},
    resave: false
}));

app.use(cookieParser());

const validUsername = 'validuser';
const validPassword = 'validpwd';
var session1

app.listen(PORT, ()=>{
    console.log("Server started at "+PORT);
});

app.get('/', (req,res)=>{
    session1 = req.session;
    if(session1.userid){
        res.send("Welcome back");
    }
    else{
        res.sendFile('views/index.html', {root:__dirname});
    }
    
});

app.post('/userProfile', (req,res)=>{
    var username = req.body.uname;
    var password = req.body.pwd;
    var deviceType = req.body.device;
    if(username == validUsername && password == validPassword){
        session1 = req.session;
        session1.userid = username;
        res.send("Welcome "+username);
    }
    else{
        res.send("Invalid details!<a href=\'/\'>Back to Login/a>");
    }
    
});


app.get('/logout', (req,res)=>{
    req.session.destroy();
    req.redirect('/');
})