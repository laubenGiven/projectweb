const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');
const { Console } = require('console');
const bodyParser = require('body-parser');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'lee',
    password: 'alien123.com',
    database: 'nodelogin'
});

// testing database connection
connection.connect(function(error){
	if(error) throw error
	else  console.log('************************Successful Database connection************************');
});

const app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: false
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Redirect to the login page when accessing the root URL
app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/app.html'));
});

// Serve the login page
app.get('/login', function(request, response) {
	response.sendFile(path.join(__dirname + '/app.html'));
});

// Serve the lregister  page
app.get('/register', function(request, response) {
	response.sendFile(path.join(__dirname + 'public/Register.html'));
});

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'lee',
  password: 'alien123.com',
  database: 'nodelogin',
});
// Handle POST requests to the registration form
app.post('/register', (req, res) => {
  // Extract form data from request body
  const { role, username, email, password } = req.body;

  // Insert data into database
  pool.query('INSERT INTO users ( role, username, email, password) VALUES (?, ?,?, ?)', [role,username, email, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error inserting data into database');
    }

    // Send success response
    res.send('Account Created Successfully!');
  });
});



// Authenticate the user
app.post('/auth', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exist and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
				// Redirect to home page
				response.redirect('/home.html');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!!!!');
		response.end();
	}
});



// Server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});




/**const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const session = require('express-session');


const app = express();
app.use(express.static('public'));

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'lee',
  password: ' alien123.com',
  database: 'nodelogin'
});
// testing database connection
connection.connect(function(error){
	if(error) throw error
	else  console.log('************************Successful Database connection************************');
});

// Express session
app.use(session({
  secret: 'secret-key',
  resave: true,
  saveUninitialized: true
}));

// Login route
app.post('/auth', (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists in the database
  db.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
    if (error) {
      res.status(500).send('Internal Server Error');
    } else if (results.length === 0) {
      res.status(401).send('Invalid username or password');
    } else {
      // Check if the password matches
      bcrypt.compare(password, results[0].password, (err, isMatch) => {
        if (err) {
          res.status(500).send('Internal Server Error');
        } else if (!isMatch) {
          res.status(401).send('Invalid username or password');
        } else {
          // Set the user session
          req.session.user = username;
          res.redirect('/home');
        }
      });
    }
  });
});

// Dashboard route
app.get('/home', (req, res) => {
  // Check if the user is logged in
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    res.send(`Welcome ${req.session.user}`);
  }
});

// Server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
*/