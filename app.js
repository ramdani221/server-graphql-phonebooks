var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var { graphqlHTTP } = require("express-graphql")
var cors = require('cors');
const { schema, solution } = require('./graphql/phonebooks');
const fileUpload = require('express-fileupload');


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/phonebooksdb');
}

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use(fileUpload())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: solution,
    graphiql: true
}))

module.exports = app;
