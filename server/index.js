const express = require('express'),
    passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth20').Strategy,
    keys = require('./config/keys'),


    app = express();


passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken) => {
        console.log(accessToken);
    })
);

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {console.log(`Now docked on port ${PORT}!`)});