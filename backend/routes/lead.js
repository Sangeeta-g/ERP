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
        WHERE department = 'Customer Relationship Management' AND role = 'employee';
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


  // Get lead by ID
router.get("/leads/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const lead = await pool.query("SELECT * FROM leads WHERE id = $1", [id]);

        if (lead.rows.length === 0) {
            return res.status(404).json({ message: "Lead not found" });
        }

        res.json(lead.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server Error" });
    }
});


// Update Lead
router.put("/leads/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, company, source, assigned_to } = req.body;

        const updateLead = await pool.query(
            "UPDATE leads SET name = $1, email = $2, phone = $3, company = $4, source = $5, assigned_to = $6 WHERE id = $7 RETURNING *",
            [name, email, phone, company, source, assigned_to, id]
        );

        if (updateLead.rows.length === 0) {
            return res.status(404).json({ message: "Lead not found" });
        }

        res.json({ message: "Lead updated successfully", lead: updateLead.rows[0] });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server Error" });
    }
});


router.delete("/leads/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    console.log("Delete request received for Lead ID:", id);

    try {
        const result = await pool.query("DELETE FROM leads WHERE id = $1 RETURNING *", [id]);

        if (result.rowCount === 0) {
            console.log("Lead not found:", id);
            return res.status(404).json({ error: "Lead not found" });
        }

        console.log("Lead deleted successfully:", id);
        res.json({ message: "Lead deleted successfully" });

    } catch (error) {
        console.error("Error deleting lead:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// View lead details
router.get('/leads_list', async (req, res) => {
    try {
        const { user_id } = req.query;

        if (!user_id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        console.log("Fetching leads for user ID:", user_id);

        const query = `
            SELECT * FROM leads 
            WHERE assigned_to = $1 
            ORDER BY id DESC;
        `;

        const result = await pool.query(query, [user_id]);

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

// api to add updates of the lead
router.post('/add_update', async (req, res) => {
    try {
        console.log("Received request:", req.body); // Debugging line
        const { lead_id, sales_employee_id, update_text } = req.body;

        if (!lead_id || !sales_employee_id || !update_text) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const query = `
            INSERT INTO lead_updates (lead_id, sales_employee_id, update_text)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;

        const result = await pool.query(query, [lead_id, sales_employee_id, update_text]);

        res.status(201).json({ message: "Lead update added successfully", lead_update: result.rows[0] });
    } catch (error) {
        console.error("Error adding lead update:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});


// API to get updates history 
router.get('/:lead_id/updates', async (req, res) => {
    try {
        const { lead_id } = req.params;

        const query = `
            SELECT * FROM lead_updates 
            WHERE lead_id = $1 
            ORDER BY created_at DESC;
        `;

        const result = await pool.query(query, [lead_id]);

        res.status(200).json({ updates: result.rows });
    } catch (error) {
        console.error("Error fetching lead updates:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});


// Api for changing status of the lead
router.put("/:id/status", async (req, res) => {
    const leadId = req.params.id;
    const { status } = req.body;

    console.log("✅ Received request to update status:", req.body); // Debugging

    if (!status) {
        console.error("❌ Error: Status is missing in request");
        return res.status(400).json({ error: "Status is required" });
    }

    // Corrected PostgreSQL query syntax
    const query = "UPDATE leads SET status = $1, updated_at = NOW() WHERE id = $2";

    pool.query(query, [status, leadId], (err, result) => {
        if (err) {
            console.error("❌ Error updating status:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        console.log("✅ Lead status updated successfully for ID:", leadId);
        res.json({ message: "Lead status updated successfully", updated_at: new Date() });
    });
});


// API for fetcching lead updates to display on the managers dashboard
router.get('/lead-updates/:id',async (req,res)=>{
    try{
        const leadId = req.params.id;
    console.log("Fetching lead updates for Lead ID:", leadId);
    const query = `
            SELECT * FROM lead_updates 
            WHERE lead_id = $1 
            ORDER BY created_at DESC;
        `;

        const result = await pool.query(query, [leadId]);
        res.status(200).json({ updates: result.rows });
    } catch (error) {
        console.error("Error fetching lead updates:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }

});

// API to get all sales employees
router.get('/view-sales-employees',(req,res)=>{
    pool.query("SELECT * from users where role='employee' and department='Sales'",(err,result)=>{
        if(err){
            console.log(err);
            return res.status(500).json({message:"Internal server error"});
        }
        res.status(200).json({employees:result.rows});
    })
})

  
export default router;  // Update to use export default
