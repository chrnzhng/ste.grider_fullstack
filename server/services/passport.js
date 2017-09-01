const passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth20').Strategy,
    mongoose = require('mongoose'),
    keys = require('../config/keys');


const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
    // user.id is referencing user collection in MongoDB
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({
                googleId: profile.id
            })
            .then((existingUser) => {
                if (existingUser) {
                    // we already have a record with the given profile ID
                    done(null, existingUser);
                } else {
                    // we don't have a user record with this ID, make a new record
                    new User({
                            googleId: profile.id
                        }).save()
                        .then(user => done(null, user));
                }
            });
    })
);