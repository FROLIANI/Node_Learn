const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./models/dbhelper');
const authRoute = require('./routes/auth');

// Register App
const app = express(); 

// Database Connection
db.connection();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Route  
app.use('/api/auth', authRoute);

const port = process.env.PORT || 8082;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
