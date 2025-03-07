import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';
import bcrypt from 'bcrypt';

// Load environment variables from the .env file
dotenv.config();

// Importing the lead routes
import leadRoutes from './routes/lead.js';

// Create an instance of an Express application
const app = express();

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
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
// Use the lead routes
app.use('/api/leads', leadRoutes);


import pool from './config/db.js'; 


// Define a simple route for testing
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/employees', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching employees:', err.stack);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server and listen on the specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
