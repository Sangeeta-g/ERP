import express from 'express';
import pool from "../config/db.js";

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching employees:', err);
    }
})

// API Route to handle user registration
router.post("/", async (req, res) => {
    const {
      email,
      password,
      role,
      first_name,
      last_name,
      phone,
      department,
      position,
      salary,
      date_of_joining,
    } = req.body;
  
    // List of valid roles based on the database constraint
    const validRoles = ["admin", "employee", "manager"];
  
    // Ensure all required fields are present
    if (!email || !password || !role || !first_name || !last_name || !salary || !date_of_joining) {
      return res.status(400).json({ error: "Missing required fields" });
    }
  
    // Validate role
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: "Invalid role provided" });
    }
  
    try {
      const result = await pool.query(
        `INSERT INTO users (email, password_hash, role, first_name, last_name, phone, department, position, salary, date_of_joining) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
        [email, password, role, first_name, last_name, phone, department, position, salary, date_of_joining]
      );
  
      res.status(201).json({ message: "Employee added successfully!", employee: result.rows[0] });
    } catch (err) {
      console.error("Database Error:", err);
      res.status(500).json({ error: err.message });
    }
  });

export default router;