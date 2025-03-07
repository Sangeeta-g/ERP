import express from "express";
import pool from "../config/db.js"; // Update to use import

const router = express.Router();

// Add a new lead
router.post("/", async (req, res) => {
    try {
        console.log("hiii")
        const { name, email, phone, company, source, assigned_to } = req.body;

        const query = `
            INSERT INTO leads (name, email, phone, company, source, assigned_to, status)
            VALUES ($1, $2, $3, $4, $5, $6, 'New')  -- Set default status to 'New'
            RETURNING *;
        `;

        const values = [name, email, phone, company, source, assigned_to];

        const result = await pool.query(query, values);

        res.status(201).json({ message: "Lead added successfully", lead: result.rows[0] });
    } catch (error) {
        console.error("Error adding lead:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

export default router;  // Update to use export default
