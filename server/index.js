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
    }, (accessToken, refreshToken, profile, done) => {
        console.log('access token', accessToken);
        console.log('refresh token', refreshToken);
        console.log('profile', profile);
    })
);

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

app.get('/auth/google/callback', passport.authenticate('google'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Now docked on port ${PORT}!`)
});