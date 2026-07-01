 // Load environment variables from .env file
require ("dotenv").config();

// Package imports, instead of import you use require() Framework for building the web server
const express = require("express");

// Allows react frontend to make requests to the backend, cors stand for Cross-Origin Resource Sharing, they are in different ports but sharing resources
const cors = require("cors");

// Official tool to connect Node.js with PostgreSQL, pg stands for PostgreSQL, Pool is a manager for multiple connections
const { Pool } = require("pg");

// Init the actual server application in app
const app = express();

// React app is on port 5173 and server on 3000, so using app.use(cors()) allows the frontend to make requests to the backend
app.use(cors());

// The following line translates it back into usable javascript object as express.json fixes the request body to be a javascript object instead of a string
app.use(express.json());

// Using the pool manager to connect to the PostgreSQL database, Blueprint to find it, all the credential are in the env file
const pool = new Pool({

    /*user: process.env.DB_USER, // User created in setup.sql
    host: process.env.DB_HOST, // Database is on this computer local
    database: process.env.DB_NAME, // The name of the database created in setup.sql
    password: process.env.DB_PASSWORD, // The password set up
    port: process.env.DB_PORT, // The default port for PostgreSQL*/

    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false 
    } 
})


// GET request to the /api/scores endpoint, this is the endpoint that the frontend will call to get the top 10 scores
app.get('/api/scores', async (req, res) => {
    try {
        // Send a raw SQL query to the database to get the top 10 scores ordered in desc. 
        const result = await pool.query('SELECT * FROM leaderboard ORDER BY score DESC LIMIT 50');
        // Send the result back to the front end as a json object, result.rows is an array of objects
        res.json(result.rows);
    } catch (error) {
        // If there is an error, log it in the console and send a 500 status which means internal server error
        console.error('Error fetching scores:', error);
        res.status(500).json('Server error');
    }
})

// POST request to the /api/scores endpoint, this is the endpoint that the frontend will call to submit a new score
app.post('/api/scores', async (req, res) => {
    // Destructure the name, message and score from the request body, this is the data that the frontend sent to the backend
    const { name, message, score } = req.body;
    try {
        // Send a raw SQL query to the database to insert the new score, the $1, $2 and $3 are placeholders for the values that will be passed in the array [name, message, score]}}
        const result = await pool.query('INSERT INTO leaderboard (name, message, score) VALUES ($1, $2, $3) RETURNING *', [name, message, score]);
        // Send the row that was just inserted back to the frontend as a json object
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error submitting the scores:', error);
        res.status(500).json('Server error');
    }
})

// Start the server and listen on the specified port
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});