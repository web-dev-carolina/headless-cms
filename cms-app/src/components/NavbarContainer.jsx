import React, { useContext } from 'react';
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import { HashLink as HLink } from 'react-router-hash-link';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard.jsx'
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import ProjectSelect from './ProjectSelect.jsx';
import PeoplePage from './people/PeoplePage.jsx'
import TestimonialsPage from './testimonials/TestimonialsPage.jsx';
import TextContentPage from './text/TextContentPage.jsx';
import UserContext from "../context/UserContext.js";
import "../styles/NavbarContainer.css";
import { useHistory } from 'react-router-dom';

const NavbarContainer = () => {
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();

    const logout = () => {
        setUserData({
            token: undefined,
            userInfo: undefined
        })
        localStorage.clear();
        history.push("/login");
    };

    return (
        <>
            <Navbar sticky="top" bg="light" variant="light" className="navbar" expand="sm" collapseOnSelect>
                <Navbar.Brand className="logo-nav">
                    {/* <img alt="logo" src={require("../images/wdc-circle-logo.png")} width="30" height="30" className="d-inline-block align-top" /> */}
          &ensp; Web Dev Carolina CMS
        </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                    </Nav>
                    {userData.token !== undefined ? (
                        <>
                            {userData.userInfo.activeProject !== "" && userData.userInfo.activeProject !== undefined ? (
                                <>
                                    <Navbar.Text className="pr-3">Active project: <span className="black-text">{userData.userInfo.activeProject}</span></Navbar.Text>
                                </>
                            ) : (<></>)}
                            <Navbar.Text className="pr-3">Signed in as: <span className="black-text">{userData.userInfo.user}</span></Navbar.Text>
                            <Button as={HLink} onClick={logout} to="signin" variant="outline-dark" className="ml-3">Log out</Button>
                        </>
                    ) : (
                            <>
                                <Button as={HLink} to="/signin" variant="outline-dark" className="ml-3">Sign in</Button>
                                <Button as={HLink} to="/signup" variant="outline-dark" className="ml-3">Sign up</Button>
                            </>
                        )}
                </Navbar.Collapse>
            </Navbar>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/signin" component={Login} />
                {userData.token !== undefined ? (
                    <>
                        <Route path='/signup' component={Signup} />
                        <Route path='/projectselect' component={ProjectSelect} />
                        <Route path='/dashboard' component={Dashboard} />
                        <Route path='/people' component={PeoplePage} />
                        <Route path='/testimonials' component={TestimonialsPage} />
                        <Route path='/text' component={TextContentPage} />
                    </>
                ) : (
                        <>
                            <Route path='/signup' component={Signup} />
                            <Route path='/projectselect' component={Login} />
                            <Route path='/dashboard' component={Login} />
                            <Route path='/people' component={Login} />
                            <Route path='/testimonials' component={Login} />
                        </>
                    )}
            </Switch>
        </>
    )
};

export default NavbarContainer;