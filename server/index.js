const express = require('express');
const app = express();
const mysql2 = require('mysql2');
const cors = require('cors');
const PORT = 3001;

const { encrypt, decrypt } = require('./encryptionAndDecryptionHandler');

app.use(cors());
app.use(express.json());

const db = mysql2.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'password',
  database: 'PasswordManager',
});

app.post('/add-password', (req, res) => {
  const { password, website } = req.body;
  const encryptedPassword = encrypt(password);

  db.query(
    'INSERT INTO passwords (password, website, iv) VALUES (?,?,?)',
    [encryptedPassword.password, website, encryptedPassword.iv],
    (err, result) => {
      if (err) console.log(err);
      else res.send('Success');
    }
  );
});

app.get('/passwords', (req, res) => {
  db.query('SELECT * FROM passwords;', (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

app.post('/decrypt-password', (req, res) => {
  res.send(decrypt(req.body));
});

app.listen(PORT, () => console.log(`Server is running on, ${PORT}`));
