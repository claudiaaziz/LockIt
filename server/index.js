const express = require("express");
const app = express();
const mysql = require("mysql");
const PORT = 3001;

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "PassworManager",
});

app.post("/add-password", (req, res) => {
  const { password, website } = req.body;

  db.query(
    "INSERT INTO passwords (password, title) VALUES (?,?)",
    [password, website],
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Success");
      }
    }
  );
});

app.listen(PORT, () => console.log(`Server is running on, ${PORT}`));
