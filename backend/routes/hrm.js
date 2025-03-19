import express from "express";
import pool from "../config/db.js"; 

// Update to use import
import bcrypt from "bcrypt";


const router = express.Router();


// API to get all employees
router.get('/view-employees',(req,res)=>{
    pool.query("SELECT * FROM users WHERE role NOT IN ('admin', 'HR')", (err, result) => {
        if(err){
            console.log(err);
            return res.status(500).json({message:"Internal server error"});
        }
        res.status(200).json({employees:result.rows});
    })
})


// API to delete employee record
router.delete("/delete-emp/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    console.log("Delete request received for employee ID:", id);
    try {
        const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Employee not found" });
        }

        res.json({ message: "Employee deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// API Add a new Employees
router.post("/add-emp", async (req, res) => {
    try {
        const { first_name, last_name, email, phone, role, department, position, salary, date_of_joining, status } = req.body;

        // Hash the phone number to use as the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(phone, saltRounds);

        const query = `
            INSERT INTO users (first_name, last_name, email, phone, role, department, position, salary, date_of_joining, status, password_hash)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
            RETURNING *;
        `;

        const values = [first_name, last_name, email, phone, role, department, position, salary, date_of_joining, status, hashedPassword];

        const result = await pool.query(query, values);

        res.status(201).json({ message: "Employee added successfully", employee: result.rows[0] });
    } catch (error) {
        console.error("Error adding employee:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Get employee details by ID
router.get("/employee/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

        if (employee.rows.length === 0) {
            return res.status(404).json({ message: "Employee not found" });
        }

        console.log("Employee Role:", employee.rows[0].role); // Print role in console

        res.json(employee.rows[0]);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
});


// Update employee details
router.put("/edit-employee/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, email, phone, role, department, position, salary, date_of_joining, status } = req.body;

        console.log("Updating Employee ID:", id);
        console.log("Received Data:", req.body); // Debugging

        const updateEmployee = await pool.query(
            "UPDATE users SET first_name = $1, last_name = $2, email = $3, phone = $4, role = $5, department = $6, position = $7, salary = $8, date_of_joining = $9, status = $10 WHERE id = $11 RETURNING *",
            [first_name, last_name, email, phone, role, department, position, salary, date_of_joining, status, id]
        );

        if (updateEmployee.rows.length === 0) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.json({ message: "Employee updated successfully", employee: updateEmployee.rows[0] });
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({ message: "Server Error" });
    }
});


// Get Attendance Records for a Specific User (Descending Order)
// Get Attendance Records for a Specific User (Descending Order)
router.get("/attendance/:userId", async (req, res) => {
    const { userId } = req.params;
    console.log("Fetching attendance for user ID:", userId);

    try {
        const result = await pool.query(
            "SELECT * FROM attendance WHERE user_id = $1 ORDER BY date DESC",
            [userId]
        );
        console.log("Attendance records fetched:", result.rows);
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching attendance:", err);
        res.status(500).json({ error: err.message });
    }
});

// Check-in (Login)
router.post("/attendance/check-in", async (req, res) => {
    const { user_id, image } = req.body;
    const date = new Date().toISOString().split("T")[0];

    console.log("Check-in request received for user ID:", user_id);

    try {
        const existingRecord = await pool.query(
            "SELECT * FROM attendance WHERE user_id = $1 AND date = $2",
            [user_id, date]
        );

        if (existingRecord.rows.length > 0) {
            console.warn("User  already checked in today.");
            return res.status(400).json({ message: "User  has already checked in today." });
        }

        const result = await pool.query(
            "INSERT INTO attendance (user_id, date, check_in, image) VALUES ($1, $2, NOW(), $3) RETURNING *",
            [user_id, date, image]
        );

        console.log("Check-in successful:", result.rows[0]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error checking in:", err);
        res.status(500).json({ error: err.message });
    }
});

// Check-out (Logout)
router.post("/attendance/check-out", async (req, res) => {
    const { user_id } = req.body;
    const date = new Date().toISOString().split("T")[0];

    try {
        const result = await pool.query(
            "UPDATE attendance SET check_out = NOW(), total_working_hours = EXTRACT(EPOCH FROM (NOW() - check_in)) / 3600 WHERE user_id = $1 AND date = $2 RETURNING *",
            [user_id, date]
        );

        if (result.rowCount === 0) {
            return res.status(400).json({ message: "No check-in record found for today." });
        }

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


export default router; 