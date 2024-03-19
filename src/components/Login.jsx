import { useState } from 'react';
import { postLogin } from '../services/api'
import './Login.css';

export const Login = ({ onLogin, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = await postLogin({ username, password });
      onLogin({ username, token });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (

    <div className="login-modal">
      <div className="login-content">
      <p className='text-email'> For testing please use: <br />
      <strong>Email:</strong> eve.holt@reqres.in
      <br /><strong>Password:</strong> cityslicka </p>
        <form id="loginForm" onSubmit={handleSubmit}>
          <input id="username" type="text" value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder='Username' />
          <input id="password" type="password" value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder='Password' />
          <input className='btn-login' type="submit" value="Submit" />
        </form>
        {errorMessage && <div id="errorMessage">{errorMessage}</div>}
      </div>
    </div>
  );
};

fetch('https://reqres.in/api/users/1')
.then(res => res.json())
.then(data => console.log(data))
