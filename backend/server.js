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

app.post('/add-user', async (req, res) => {
    try {
        const { email, password_hash, role, first_name, last_name, phone, department, position, salary, date_of_joining, status } = req.body;

        const result = await db.query(
            `INSERT INTO users (email, password_hash, role, first_name, last_name, phone, department, position, salary, date_of_joining, status)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
            [email, password_hash, role, first_name, last_name, phone, department, position, salary, date_of_joining, status]
        );

        res.status(201).json({ message: 'User added successfully', user: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
