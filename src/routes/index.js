const express = require('express');
const controllers = require('../controllers/profileController');
const usercontrollers = require('../controllers/userController');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
require('../middleware/auth.js');

const app = express();

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.get('/', (req, res) => {
    res.send('<a href="/api/auth/google">Authenticate with Google</a>');
  });
  app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/api/protected',
    failureRedirect: '/api/auth/google/failure'
  })
);

app.get('/protected', isLoggedIn, usercontrollers.createProfile );
app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('Goodbye!');
});

app.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

app.post('/profile', controllers.createProfile);
app.get('/profile', controllers.getAllProfile);
app.get('/profile/:profileId', controllers.getProfileById);
app.put('/profile/:profileId', controllers.updateProfile);
app.delete('/profile/:profileId', controllers.deleteProfile);
module.exports = app;