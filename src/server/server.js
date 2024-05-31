const express = require("express");
const cors = require("cors");
const db = require("./config/db"); // db.js 파일 가져오기

const app = express();
const port = 5100;

app.use(cors());
app.use(express.json());

app.post("/api/check", (req, res) => {
    const { user_id, user_pw } = req.body;
    if (!user_id || !user_pw) {
      res.status(400).send("Bad Request: Missing user_id or user_pw");
      return;
    }
  
    const sql = "SELECT * FROM user_info WHERE user_id = ? AND user_pw = ?";
    db.query(sql, [user_id, user_pw], (err, result) => {
      if (err) {
        console.error("Error fetching data from MySQL:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      if (result.length > 0) {
        const { user_name } = result[0];
        res.json({ valid: true, user_name });
      } else {
        res.json({ valid: false });
      }
    });
  });
  app.post('/api/register', async (req, res) => {
    const { user_id, user_pw, user_name, user_num, user_date } = req.body;
  
    // Validate required fields
    if (!user_id || !user_pw || !user_name || !user_num || !user_date) {
      return res.status(400).json({ error: 'Bad Request: Missing required fields' });
    }
  
    try {
      // Check if user_id or user_num already exists
      const checkUserSql = 'SELECT user_id, user_num FROM user_info WHERE user_id = ? OR user_num = ?';
      db.query(checkUserSql, [user_id, user_num], async (err, result) => {
        if (err) {
          console.error('Error fetching data from MySQL:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        if (result.length > 0) {
          return res.status(409).json({ error: 'Conflict: User ID or User Number already exists' });
        } else {
          const insertUserSql = `
            INSERT INTO user_info (user_id, user_pw, user_name, user_num, user_date)
            VALUES (?, ?, ?, ?, ?)
          `;
          db.query(insertUserSql, [user_id, user_pw, user_name, user_num, user_date], (err, result) => {
            if (err) {
              console.error('Error inserting data into MySQL:', err);
              return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.status(201).json({ success: true });
          });
        }
      });
    } catch (error) {
      console.error('Unexpected error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
app.get("*", (req, res) => {
    res.status(404).send("Not Found");
  });
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
