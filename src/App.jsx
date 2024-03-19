import { useState } from "react";
import { Login } from "./components/Login";
import { TodoWrapper } from "./components/TodoWrapper";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = ({ username, token }) => {
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);
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
}

export default App;
