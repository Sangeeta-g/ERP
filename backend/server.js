import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';
import bcrypt from 'bcrypt';

import pool from './config/db.js'; 
// Load environment variables from the .env file
dotenv.config();

// Importing the lead routes
import leadRoutes from './routes/lead.js';
import hrmRoutes from './routes/hrm.js';

// Create an instance of an Express application
const app = express();

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// // Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Query the database for the user
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [username]);
        const user = result.rows[0];
        
        if (user) {
            // Compare the entered password with the hashed password in the database
            const isPasswordValid = await bcrypt.compare(password, user.password_hash);

            if (isPasswordValid) {
                console.log(user.first_name)
                // Password matches, return success
                console.log(user.position)
                console.log(user.id)
                return res.json({ success: true, role: user.role, first_name: user.first_name, last_name: user.last_name, 
                    position: user.position, id: user.id });
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

app.use('/api/hrm', hrmRoutes);



// Define a simple route for testing
app.get('/', (req, res) => {
    res.send('Hello World!');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
