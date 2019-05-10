require('dotenv').config();
// require('dotenv').config({path: __dirname + '/.env'})
const express = require('express');
const cors = require('cors');
const path = require("path")


const app = express();

const PORT = (process.env.PORT || 8080);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use('/', express.static(path.join(__dirname, 'build')));

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

    // intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        // respond with 200
        console.log("Allowing OPTIONS");
        res.send(200);
    }
    else {
        // move on
        next();
    }
});

/*** Database ***/
mongoose.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
    console.log("MongoDB connected")
});
let answers = require('./answer.model');
let questions = require('./question.model');

/*** Routes ***/
let questionsRoute = require('./questions_router');
app.use('/api/questions', questionsRoute);

let answersRoute = require('./answers_router');
app.use('/api/answers', answersRoute);


app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

/*** API ***/
app.listen(PORT, function () {
    console.log('Current API: ' + process.env.API);
    console.log('Current connection string: ' + process.env.CONNECTION_STRING);
    console.log('Current password: : ' + process.env.PASSWORD);
    console.log("Server is running on port: "+PORT);
});

/*** Error handling ***/
app.use(function (err, req, res) {
    console.error(err);
    res.status(500).send({msg: 'Something broke! ' + err})
});