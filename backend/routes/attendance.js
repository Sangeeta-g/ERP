import express from 'express';
import multer from 'multer';
import path from 'path';
import pool from '../config/db.js';

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Middleware for handling file upload errors
const uploadMiddleware = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) return res.status(500).json({ error: "File upload failed" });
    next();
  });
};

// ✅ Save check-in data
router.post('/check-in', uploadMiddleware, async (req, res) => {
  const { employee_id, check_in } = req.body;
  if (!req.file) return res.status(400).json({ error: "Image is required" });

  const check_in_image = `/uploads/${req.file.filename}`;

  try {
    const result = await pool.query(
      `INSERT INTO attendances (employee_id, check_in, check_in_image) 
       VALUES ($1, $2, $3) RETURNING *`,
      [employee_id, check_in, check_in_image]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error checking in' });
  }
});

// ✅ Save check-out data
router.post('/check-out', uploadMiddleware, async (req, res) => {
  const { employee_id, check_out } = req.body;
  if (!req.file) return res.status(400).json({ error: "Image is required" });

  const check_out_image = `/uploads/${req.file.filename}`;

  try {
    const result = await pool.query(
      `UPDATE attendances 
       SET check_out = $1, check_out_image = $2, status = 'present'
       WHERE employee_id = $3 AND check_out IS NULL 
       RETURNING *`,
      [check_out, check_out_image, employee_id]
    );

    if (result.rowCount === 0) {
      return res.status(400).json({ error: "No active check-in found for this employee" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error checking out' });
  }
});

// ✅ Get all attendance records
router.get('/attendance', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM attendances ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching records' });
  }
});

export default router;
