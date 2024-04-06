import './App.css';
import { useEffect, useState } from 'react';
import Axios from 'axios';

function App() {
  const [password, setPassword] = useState('');
  const [website, setWebsite] = useState('');
  const [passwordList, setPasswordList] = useState([]);

  const addPassword = () => {
    Axios.post('http://localhost:3001/add-password', {
      password,
      website,
    });
  };

  const decryptPassword = (encryptedPassword) => {
    Axios.post('http://localhost:3001/decrypt-password', {
      password: encryptedPassword.password,
      iv: encryptedPassword.iv,
    }).then((res) => {
      setPasswordList(
        passwordList.map((entry) => {
          return entry.id === encryptedPassword.id
            ? {
                id: entry.id,
                password: entry.password,
                website: res.data,
                iv: entry.iv,
              }
            : entry;
        })
      );
    });
  };

  useEffect(() => {
    Axios.get('http://localhost:3001/passwords').then((res) =>
      setPasswordList(res.data)
    );
  }, []);

  return (
    <div className='App'>
      <div className='add-password-div'>
        <input
          type='password'
          placeholder='Ex: password123'
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          placeholder='Ex. Github'
          onChange={(e) => setWebsite(e.target.value)}
        />
        <button onClick={addPassword}>Add Password</button>
      </div>
      <div className='passwords-list'>
        <h2>Your Passwords</h2>
        {passwordList.map((entry, id) => {
          return (
            <div
              className='password'
              key={id}
              onClick={() =>
                decryptPassword({
                  password: entry.password,
                  iv: entry.iv,
                  id: entry.id,
                })
              }
            >
              <h3>{entry.website}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;