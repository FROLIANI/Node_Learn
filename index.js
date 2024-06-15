const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./models/dbhelper');
const authRoute = require('./routes/auth');

//Register App
const app = express(); 

//Database Connection
db.connection();

app.use(bodyParser());
app.use(bodyParser.urlencoded({
    extended: true,
})
)

//Route
app.use('/api/auth', authRoute)

//cokie parser
app.use(cookieParser());

const port = process.env.PORT
app.listen(port,()=>{
    console.log(`app is running on port ${port}`);

})