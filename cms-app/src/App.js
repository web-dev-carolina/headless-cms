import NavbarContainer from './components/NavbarContainer.jsx';
import React, { useState, useEffect } from "react";
import './App.css';
import { useHistory } from "react-router-dom";
import UserContext from "./context/UserContext.js";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [userData, setUserData] = useState({ token: undefined, user: undefined });

  let history = useHistory();
  history.push('/login');

  return (
    <UserContext.Provider value={{ userData, setUserData }} >
      <NavbarContainer />
    </UserContext.Provider>
  );
}

export default App;
