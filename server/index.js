const express = require('express'),
    mongoose = require('mongoose'),
    keys = require('./config/keys'),
    cookieSession = require('./cookie-session');
    require('./models/User');
    require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express();



require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Now docked on port ${PORT}!`)
});