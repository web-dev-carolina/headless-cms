const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('./node_modules/mongoose');
const cors = require('cors');
const indexRouter = require('./routes/index');
const body_parser = require('body-parser');
const express = require('express');
const app = express();

app.use(cors());
app.options('*', cors());
// parse JSON (application/json content-type)
app.use(body_parser.json());

const Testimonial = require("./models/testimonial_model.js");

// mongoose setup
mongoose.connect('mongodb+srv://admin:WebDev1!@cluster0.0eoiv.mongodb.net/test1?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err) => {
    if (err) throw err;
    else console.log('mongodb connection successful');
});

const db = require("./db");
const dbName = "test1";
const collectionName = "testimonials";
let testimonials;
db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
    testimonials = dbCollection;
}, function (err) { // failureCallback
    throw (err);
});

/* CRUD routes */

// CREATE new testimonial
// ex. $ curl -X POST -H "Content-Type: application/json" -d '{"text":"testimonial body", "author":"testimonial author"}' http://localhost:9000/testimonials
// -> new JSON object
app.post("/testimonials", (req, res) => {
    const item = req.body;
    testimonials.insertOne(item, (error, result) => {
        if (error) throw error;
        // respond with all items in collection
        testimonials.find().toArray((_error, _result) => {
            if (_error) throw _error;
            res.json(_result);
        });
    });
});

// READ all testimonials
// ex. $ curl http://localhost:9000/testimonials
// -> all testimonials as JSON
app.get("/testimonials", (req, res) => {
    // respond with all items in collection
    testimonials.find().toArray((error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

// UPDATE a testimonial
// ex. $ curl -X PUT -H "Content-Type: application/json" -d '{"text":"testimonial body", "author":"testimonial author"}' http://localhost:9000/testimonials/5fe1104ce721ee218b985723
// -> JSON object matching the id
app.put("/testimonials/:id", async (req, res) => {
    try {
        const testId = req.params.id;
        const item = req.body;
        let testi = await Testimonial.findById(testId);
        testi.text = item.text;
        testi.author = item.author;
        testi.save()
        const savedTesti = await Testimonial.findById(testId);
        res.json({
            testi : {
                text: savedTesti.text,
                author: savedTesti.author,
            }
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// DESTROY a testimonial
// ex. 
// ->JSON object matching the id
app.get("/testimonials", (req, res) => {
    console.log("get testimonials");
    // return full list
    testimonials.find().toArray((error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

