import React, { useState, useContext } from "react";
import { Form, Container, Button } from "react-bootstrap";
import "../styles/Login.css";
import Axios from "axios";
import UserContext from '../context/UserContext.js';
import { useHistory } from "react-router-dom";


export default function ProjectSelect() {
  const history = useHistory();
  const { userData, setUserData } = useContext(UserContext);

  function getProjects() {
    return userData.userInfo.proj.slice(0, -1);
  }

  async function clickHandler(project) {
    console.log(project);
    const projReqBody = { "project": project }
    const projRes = await Axios.post("http://localhost:9000/projects/connect", projReqBody);
    // setUserData({
    //   userData,
    //   proj: project
    // })
    history.push('/home');
  }

  return (
    <Container className="login pt-3">
      <h3 className="text-center">Select the project you want to work on.</h3>
      <div className="projects-list pt-3">
        {
          getProjects().map(p =>
            <>
              <Button key={p} variant="secondary" size="lg" block onClick={(e) => clickHandler(e.target.firstChild.data)}>
                {p}
              </Button>
              <br></br>
            </>
          )
        }
      </div>
    </Container>
  );
}