// Importing required packages
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg'; // Importing Client from pg
import bcrypt from 'bcrypt';
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
    password: "ERP@2025",
    port: 5432,
});


// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Database connection error:', err.stack);
    } else {
        console.log('Database connected successfully!');

        // Create the users table
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(100) UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                role VARCHAR(20) DEFAULT 'employee' CHECK (role IN ('admin', 'HR', 'employee')),
                first_name VARCHAR(50) NOT NULL,
                last_name VARCHAR(50) NOT NULL,
                phone VARCHAR(20),
                department VARCHAR(50),
                position VARCHAR(50),
                salary DECIMAL(10,2) NOT NULL CHECK (salary >= 0),
                date_of_joining DATE NOT NULL,
                status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

        db.query(createTableQuery, (err, res) => {
            if (err) {
                console.error('Error creating table:', err.stack);
            } else {
                console.log('Users table created successfully!');
            }
        });
    }
});



// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running on port ${PORT}");
});