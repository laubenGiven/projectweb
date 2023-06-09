const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
require('dotenv').config();
const PORT = process.env.PORT
const mongoconn = process.env.MongodbConn
const path = require('path');
const { Console } = require('console');
const bodyParser = require('body-parser');
const {Admin,createDefaultUser} = require('./models/Admin');

const loginrouter = require('./routes/login')
const app = express();









app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/login',loginrouter)



// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set the views directory path



// Connect to the MongoDB database
mongoose.connect(mongoconn, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
  });
  // middle ware configuration
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
	response.sendFile(path.join(__dirname + '/newproperty.html'));
});





// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Create a MySQL connection pool
/*
const pool = mongoose.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'lee',
  password: 'alien123.com',
  database: 'nodelogin',
});
*/


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


/*
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


*/

// Server
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
})
