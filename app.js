const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/apiprojec');


const app = express();

//Routes
const users = require('./routes/users');

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());

//Routes
app.use('/users', users);

// Catch 404 error and forworad them to error handler
app.use((req, res, next) =>{
  const err = new error('Not Found');
  err.status = 404;
  next(err);
});


// error handler function
app.use((err, req, res, next) =>{
	const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;

	// Respond to client
	res.status(status).json({
		error:{
			message: error.message
		}
	})

	//Respond to ourselve
	console.error(err);
});

// start the server

const port = app.get('port') || 3000;
app.listen(port, () => console.log('Server is listening on port {port}'));