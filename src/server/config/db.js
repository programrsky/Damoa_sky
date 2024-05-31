const mysql = require('mysql');

const db = mysql.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : 'zxc54690202@A',
    database : 'sky_team'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = db;