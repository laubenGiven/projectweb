const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');
const { Console } = require('console');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set the views directory path


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


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: false
}));



// Redirect to the login page when accessing the root URL
app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/app.html'));
});

// Serve the lregister  page

app.get('/newproperty', function(request, response) {
	response.sendFile(path.join(__dirname + '/public/newproperty.html'));
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
    res.redirect('/login');
  });
});



// Handle POST requests to the New property form
app.post('/newproperty', (req, res) => {
  // Extract form data from request body
  const { propertyID,propertyName, propertyAddress, bedrooms,bathrooms,propertyType,propertyImage,price } = req.body;

  // Insert data into database
  pool.query('INSERT INTO property( propertyID,propertyName, propertyAddress, bedrooms,bathrooms,propertyType,propertyImage,price) VALUES (?,?, ?, ?,?, ?,?, ?)', [propertyID,propertyName,propertyAddress, bedrooms,bathrooms,propertyType,propertyImage,price], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error inserting data into database');
    }

    // Send success response
   console.log( ' New Property saved Successfully!');
    res.redirect('/newproperty');
  });
});





// Fetch data from the database
// Define a route to handle incoming requests
app.get('/results', (req, res) => {
  fetchDataFromDatabase()
    .then((data) => {
      res.render('index', { data });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('An error occurred');
    });
});

function fetchDataFromDatabase() {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users', (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

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
        // Redirect to home page with a success message
        response.render('home', { message: 'Login successful! Welcome to the homepage.' });
      } else {
        response.send('Incorrect Username and/or Password!');
      }
    });
  } else {
    response.send('Please enter Username and Password!');
  }
});




// Server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});




/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
// Route for resetting password
app.post('/resetpassword', (req, res) => {
  const email = req.body.email;

  // Query database for user with provided email address
  connection.query('SELECT * FROM users WHERE email = ?', email, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else if (results.length === 0) {
      res.send('No user found with that email address');
    } else {
      const user = results[0];
      const newPassword = generateRandomPassword();
      
      // Update user's password in database
      connection.query('UPDATE users SET password = ? WHERE id = ?', [newPassword, user.id], (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        } else {
          // Send email with new password
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'your_email@gmail.com',
              pass: 'your_email_password'
            }
          });

          const mailOptions = {
            from: 'your_email@gmail.com',
            to: user.email,
            subject: 'Password Reset',
            text: `Your new password is: ${newPassword}`
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error(error);
              res.status(500).send('Internal Server Error');
            } else {
              console.log('Email sent: ' + info.response);
              res.redirect('/password_reset_confirmation');
            }
          });
        }
      });
    }
  });
});

// Route for confirmation page
app.get('/password_reset_confirmation', (req, res) => {
  res.send('Your password has been reset. Please check your email for your new password.');
});




 * 
 * 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 const express = require('express');
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