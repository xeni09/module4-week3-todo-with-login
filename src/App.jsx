import { useState } from 'react';
import './App.css';
import { Login } from './components/Login';
import { TodoWrapper  } from './components/TodoWrapper';

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }
  return (
    <div>
    
      <TodoWrapper />
    </div> 
  );
};

export default App;