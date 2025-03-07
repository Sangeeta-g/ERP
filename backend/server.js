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
    password: "ERP@2025",
    port: 5432,
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Database connection error:', err.stack);
    } else {
        console.log('Database connected successfully!');

        // Check if the users table exists
        const checkTableQuery = `
            SELECT EXISTS (
                SELECT 1 
                FROM information_schema.tables 
                WHERE table_name = 'users'
            );
        `;

        db.query(checkTableQuery, (err, res) => {
            if (err) {
                console.error('Error checking table existence:', err.stack);
            } else {
                if (!res.rows[0].exists) {
                    // Create the users table if it doesn't exist
                    const createTableQuery = `
                        CREATE TABLE users (
                            id SERIAL PRIMARY KEY,
                            email VARCHAR(100) UNIQUE NOT NULL,
                            password_hash TEXT NOT NULL,  -- Store password hash
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
                } else {
                    console.log('Users table already exists. Skipping creation.');
                }
            }
        });
    }
});

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

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});