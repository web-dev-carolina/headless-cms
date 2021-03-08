import React, { useEffect, useState, useContext } from "react";
import { Container, Button, Breadcrumb } from "react-bootstrap";
import "../styles/ProjectSelect.css";
import Axios from "axios";
import UserContext from '../context/UserContext.js';
import { useHistory } from "react-router-dom";

export default function ProjectSelect() {
    const history = useHistory();
    const { userData, setUserData } = useContext(UserContext);
    const [projectsList, setProjectsList] = useState([]);

    useEffect(() => {
        setProjectsList(userData.userInfo.proj);
    }, []);

    async function clickHandler(project) {
        const projReqBody = { "project": project };
        await Axios.post(process.env.REACT_APP_API_URL + "/info/projectsConnect", projReqBody)
            .then((res) => {
                setUserData({
                    token: userData.token,
                    userInfo: {
                        user: userData.userInfo.user,
                        proj: userData.userInfo.proj,
                        activeProject: project
                    }
                })
                history.push('/dashboard');
            }, (error) => {
                alert(error);
            });
    }

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item active>Projects</Breadcrumb.Item>
            </Breadcrumb>
            <h3 className="text-center pt-3">Select the project you want to work on.</h3>
            <Container className="project-select col-md-6" id="project-select">
                <div className="projects-list pt-3">
                    {projectsList.filter((p) => p !== "")
                        .map(p =>
                            <Button key={p} id={p} variant="secondary" size="lg" className="mb-3" block onClick={(e) => clickHandler(e.target.firstChild.data)}>
                                {p}
                            </Button>
                        )}
                </div>
            </Container>
        </>
    );
}