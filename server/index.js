const express = require("express");
const app = express();
const mysql = require('mysql')
const PORT = 3001;

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '',
  database: 'PassworManager'
})

app.get("/", (req, res) => {
  res.send("♡");
});

app.listen(PORT, () => console.log(`Server is running on, ${PORT}`));
