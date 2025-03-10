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
      
router.post('/', async (req, res) => {
    const { email, password_hash, role, first_name, last_name, phone, department, position, salary, date_of_joining } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO users (email, password_hash, role, first_name, last_name, phone, department, position, salary, date_of_joining) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
            [email, password_hash, role, first_name, last_name, phone, department, position, salary, date_of_joining]
        );
        res.status(201).json({ message: 'Employee added successfully!', employee: result.rows[0] });
    } catch (err) {

        res.status(500).json({ error: err.message });
    }
});

export default router;