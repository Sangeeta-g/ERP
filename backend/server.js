// Importing required packages
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg'; // Importing Client from pg

// Initialize dotenv to load environment variables from a .env file
dotenv.config();

// Create an instance of an Express application
const app = express();

// Middleware setup
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Database connection setup
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "ERP",
    password: "Syedshahul@786",
    port: 5432,
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Database connection error:', err.stack);
    } else {
        console.log('Database connected successfully!');
    }
});

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});