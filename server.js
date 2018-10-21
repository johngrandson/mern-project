const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('./config/cors');

const routes = require('./routes/api');

const app = express();

// BodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.all("/*", cors);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to mongodb
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', routes.users);
app.use('/api/profile', routes.profile);
app.use('/api/devices', routes.devices);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`))