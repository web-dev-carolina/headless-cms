import React, { useState, useContext } from "react";
import { Form, Container, Button } from "react-bootstrap";
import "../styles/Login.css";
import Axios from "axios";
import UserContext from '../context/UserContext.js';
import { useHistory } from "react-router-dom";

export default function ProjectSelect() {
  const history = useHistory();
  const { userData, setUserData } = useContext(UserContext);

  let getProjects = function() {
    if (userData.userInfo) return userData.userInfo.proj.slice(0, -1);
  }

  async function clickHandler(project) {
    console.log(project);
    const projReqBody = { "project": project };
    const projRes = await Axios.post(process.env.REACT_APP_API_URL+"/projects/connect", projReqBody);
    setUserData({
      token: userData.token,
      userInfo:{
        user: userData.userInfo.user,
        proj: userData.userInfo.proj,
        activeProject: project
      }
    })
    history.push('/dashboard');
  }

  return (
    <Container className="project-select pt-3" id="project-select">
      <h3 className="text-center">Select the project you want to work on.</h3>
      <div className="projects-list pt-3">
        {getProjects().map(p =>
          <>
            <Button id={p} variant="secondary" size="lg" block onClick={(e) => clickHandler(e.target.firstChild.data)}>
              {p}
            </Button>
            <br></br>
          </>
        )}
      </div>
    </Container>
  );
}