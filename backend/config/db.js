import pkg from 'pg';  // Use default import syntax
const { Pool } = pkg;  // Extract Pool from the default import

import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Create a new Pool instance for PostgreSQL connection
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'ERP',
    password: process.env.DB_PASSWORD || 'ERP@2025',
    port: process.env.DB_PORT || 5432,
});

// Test the database connection
pool.connect()
    .then(() => console.log('Connected to PostgreSQL!'))
    .catch((err) => console.error('Database connection error', err));

export default pool;
