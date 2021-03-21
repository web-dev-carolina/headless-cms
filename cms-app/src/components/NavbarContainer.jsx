import React, { useContext } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Route, Switch, Link } from 'react-router-dom';
import Dashboard from './Dashboard.jsx'
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import ProjectSelect from './ProjectSelect.jsx';
import PeoplePage from './people/PeoplePage.jsx'
import TestimonialsPage from './testimonials/TestimonialsPage.jsx';
import TextContentPage from './text/TextContentPage.jsx';
import AnnouncementsPage from './announcements/AnnouncementsPage.jsx';
import ArticlesPage from './articles/ArticlesPage.jsx';
import ImagesPage from './images/ImagesPage.jsx';
import UserContext from "../context/UserContext.js";
import "../styles/NavbarContainer.css";
import { useHistory } from 'react-router-dom';
import logo from "../images/wdc-circle-logo.png";

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
                    <img alt="logo" src={logo} width="40" height="40" className="d-inline-block align-top" />
          &ensp; Content Manager
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
                            <Button as={Link} onClick={logout} to="signin" variant="outline-dark" className="ml-3">Log out</Button>
                        </>
                    ) : (
                            <>
                                <Button as={Link} to="/signin" variant="outline-dark" className="ml-3">Sign in</Button>
                                <Button as={Link} to="/signup" variant="outline-dark" className="ml-3">Sign up</Button>
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
                        <Route path='/announcements' component={AnnouncementsPage} />
                        <Route path='/articles' component={ArticlesPage} />
                        <Route path='/images' component={ImagesPage} />
                    </>
                ) : (
                        <>
                            <Route path='/signup' component={Signup} />
                            <Route path='/projectselect' component={Login} />
                            <Route path='/dashboard' component={Login} />
                            <Route path='/people' component={Login} />
                            <Route path='/testimonials' component={Login} />
                            <Route path='/announcements' component={Login} />
                            <Route path='/articles' component={Login} />
                        </>
                    )}
            </Switch>
        </>
    )
};

export default NavbarContainer;