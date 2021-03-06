import NavbarContainer from './components/NavbarContainer.jsx';
import React, { useState, useEffect } from "react";
import './App.css';
import { useHistory } from "react-router-dom";
import UserContext from "./context/UserContext.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
require('dotenv').config();

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    userInfo: {
      user: undefined,
      proj: [undefined],
      activeProject: ""
    }
  });
  const history = useHistory();

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token == null) {
        token = "";
        localStorage.setItem("auth-token", token);
      }
      const tokenRes = await Axios.post(process.env.REACT_APP_API_URL + "/users/tokenIsValid", null, {
        headers: { "auth-token": token }
      });
      if (tokenRes.data.valid) {
        await Axios.get(process.env.REACT_APP_API_URL + "/users/" + tokenRes.data.user._id).then((res) => {
          setUserData({
            token: tokenRes.data.token,
            userInfo: {
              user: res.data.user,
              proj: res.data.proj
            },
          })
        }, (err) => {
          console.log(err);
        });
        history.push('/projectselect');
        console.log('already logged in');
      } else {
        history.push('/signin');
      }
    }
    checkLoggedIn();
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }} >
      <NavbarContainer>
      </NavbarContainer>
    </UserContext.Provider>
  );
}

export default App;
