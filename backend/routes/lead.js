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


// Update Lead Status
router.put("/:id/status", async (req, res) => {
    try {
        const { id } = req.params;  // Extract lead ID from URL params
        const { status } = req.body;  // Extract new status from request body

        // Check if status is valid (you can add more statuses if needed)
        const validStatuses = ["New", "In Progress", "Qualified", "Converted", "Lost"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        // Update status in the database
        const query = `
            UPDATE leads
            SET status = $1
            WHERE id = $2
            RETURNING *;
        `;

        const values = [status, id];
        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Lead not found" });
        }

        res.status(200).json({ message: "Lead status updated successfully", lead: result.rows[0] });
    } catch (error) {
        console.error("Error updating lead status:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});


// View lead details
router.get('/view-leads', async (req, res) => {
    try {
        console.log("Fetching all leads with assigned user details...");
        
        const query = `
            SELECT 
                leads.id, 
                leads.name, 
                leads.email, 
                leads.phone, 
                leads.company, 
                leads.source, 
                leads.status, 
                leads.created_at,
                users.first_name || ' ' || users.last_name AS assigned_to_name
            FROM leads
            LEFT JOIN users ON leads.assigned_to = users.id
            ORDER BY leads.id DESC;
        `;

        const result = await pool.query(query);
        
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "No leads found" });
        }

        res.status(200).json({ 
            message: "Leads retrieved successfully", 
            leads: result.rows 
        });
    } catch (error) {
        console.error("Error fetching leads:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});





// Sales employee 
router.get("/sales-employees", async (req, res) => {
    try {
        const query = `
        SELECT id, first_name, last_name FROM users 
        WHERE department = 'Sales' AND role = 'employee';
    `;

  
      const result = await pool.query(query);
  
      if (result.rowCount === 0) {
        return res.status(404).json({ message: "No sales employees found" });
      }
  
      res.status(200).json({ employees: result.rows });
    } catch (error) {
      console.error("Error fetching sales employees:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  export default router;  // Update to use export default
