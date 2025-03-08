import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';

// Load environment variables from the .env file
dotenv.config();

// Importing the lead routes
import leadRoutes from './routes/lead.js';
import employeeRoutes from './routes/employee.js';

// Create an instance of an Express application
const app = express();

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Database connection setup
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "ERP",
    password: "ERP@2025",
    port: 5432,
});

(async () => {
    try {
        await db.connect();
        console.log('Connected to PostgreSQL database');
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
})();



// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Query the database for the user
        const result = await db.query('SELECT * FROM users WHERE email = $1', [username]);
        const user = result.rows[0];

        if (user) {
            // Check if the provided password matches the stored password hash
            if (user.password_hash === password) { // Note: Replace this with a hash comparison in production
                return res.json({ success: true, role: user.role });
            }
        }
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    } catch (err) {
        console.error('Error during login:', err.stack);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
// Use the lead routes
app.use('/api/leads', leadRoutes);

app.use('/api/employees', employeeRoutes);

import pool from './config/db.js'; 



// Define a simple route for testing
app.get('/', (req, res) => {
    res.send('Hello World!');
});



// Start the server and listen on the specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
