import NavbarContainer from './components/NavbarContainer.jsx';
import React, { useState, useEffect } from "react";
import './App.css';
import { useHistory } from "react-router-dom";
import UserContext from "./context/UserContext.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';

function App() {
  const [userData, setUserData] = useState({ token: undefined, user: undefined });
  const history = useHistory();

  useEffect( () => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token == null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post("http://localhost:9000/users/tokenIsValid",
        null, {
        headers: { "auth-token": token }
      });
      if (tokenRes.data.valid) {
        const userRes = await Axios.get("http://localhost:9000/users/" + tokenRes.data.user._id);
        setUserData({
          token: tokenRes.data.token,
          userInfo: {
            user: userRes.data.user,
            proj: userRes.data.proj,
            activeProject: ""
          },
        });
        console.log('already logged in');
        history.push('/project-select');
      }
      else {
        history.push('/signin');
      }
    }
    checkLoggedIn();
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }} >
      <NavbarContainer />
    </UserContext.Provider>
  );
}

export default App;
