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
import employeeRoutes from './routes/employee.js';

// Create an instance of an Express application
const app = express();

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

//  const insertSalesManager = async () => {
//      try {
//          const email = 'akash@gmail.com'; // Sales Manager email
//          const role = 'employee';      // Role of the user
//          const firstName = 'Akash';         // First Name
//          const lastName = 'M';        // Last Name
//          const phone = '9876543210';        // Sales Manager's phone number
//          const department = 'Sales';        // Department
//          const position = 'Inside Sales';  // Position
//          const salary = 30000.00;           // Salary
//          const joiningDate = '2025-01-06';  // Joining date

//       // Password for Sales Manager (plain text)
//          const plainPassword = '1234';

//          // Hash the password before inserting into the database
//         const hashedPassword = await bcrypt.hash(plainPassword, 10);

//          // Insert query to insert the Sales Manager into the users table
//          const insertQuery = `
//              INSERT INTO users (email, password_hash, role, first_name, last_name, phone, department, position, salary, date_of_joining, status)
//              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'active')
//              ON CONFLICT (email) DO NOTHING;  -- Avoid inserting duplicate users
//          `;

//          // Execute the insert query
//          await pool.query(insertQuery, [
//              email, hashedPassword, role, firstName, lastName, phone, department, position, salary, joiningDate
//          ]);

//          console.log('Sales Manager inserted successfully with hashed password!');
//      } catch (error) {
//          console.error('Error inserting Sales Manager:', error);
//      }
//  };

// // Call the function to insert the Sales Manager
// insertSalesManager();
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
                return res.json({ success: true, role: user.role, first_name: user.first_name, last_name: user.last_name,});
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




// Define a simple route for testing
app.get('/', (req, res) => {
    res.send('Hello World!');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
