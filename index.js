const express = require('express');
const session = require('express-session');
const passport = require('passport');
const strategy = require('./strategy');

const app = express();
//MASSIVE, BODY PARSER & CORS

//always follw this order!
//express session first
app.use(session ({
      secret: 'asiucoai0u404uoia890'
}))
 //passport second
app.use(passport.initialize())
//passport - session third
app.use(passport.session())
//passport - strategy
passport.use(strategy)

passport.serializeUser(function(user, done){
    //GETS user from Auth0 profile
    var userInfo = {
        id: user.id,
        displayName: user.displayName,
        nickname: user.nickname,
        email: user.email
    }
    done(null, userInfo)
})

passport.deserializeUser(function( user, done ){
    done(null, user)//PUTS IN ON REQ.USER
})

app.get('/login', passport.authenticate('auth0', {
    successRedirect: '/me',
    failureRedirect: '/',
    failureFlash: true
}))

app.get('/me', function(req, res, next){
    res.json(req.user)
})

const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}`); } );