import "./App.css";
import { useState } from 'react'

function App() {
  const [password, setPassword] = useState('')
  const [website, setWebsite] = useState('')

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
        <button>Add Password</button>
      </div>
    </div>
  );
}

export default App;
