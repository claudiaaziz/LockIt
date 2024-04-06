import "./App.css";
import { useState } from 'react'
import Axios from 'axios'

function App() {
  const [password, setPassword] = useState('')
  const [website, setWebsite] = useState('')

  const addPassword = () => {
    Axios.post('http://localhost:3001/add-password', {
      password, website
    })
  }

  return (
    <div className="App">
      <div className="add-password-div">
        <input
          type="password"
          placeholder="Ex: password123"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          placeholder="Ex. Github"
          onChange={(e) => setWebsite(e.target.value)}
        />
        <button onClick={addPassword}>Add Password</button>
      </div>
    </div>
  );
}

export default App;
