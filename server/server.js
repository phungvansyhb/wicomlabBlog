require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const userRoute = require('./router/userRoute');
const app = express();

// setup middleware
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(cors())

// Route api
userRoute(app)

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});