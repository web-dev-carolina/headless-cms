import React, { useContext } from 'react';
import { Navbar, Nav, Button, Image, NavDropdown } from 'react-bootstrap';
import { HashLink as HLink } from 'react-router-hash-link';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard.jsx'
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import ProjectSelect from './ProjectSelect.jsx';
import Home from './Home.jsx';
import PeoplePage from './people/PeoplePage.jsx'
import UserContext from "../context/UserContext.js";


const NavbarContainer = () => {
  const { userData, setUserData } = useContext(UserContext);

  const logout = () => {
    setUserData({
        token: undefined,
        userInfo: undefined
    })
    localStorage.clear();
};

  return (
    <>
      <Navbar sticky="top" bg="light" variant="light" className="navbar" expand="sm" collapseOnSelect>
        <Navbar.Brand className="logo-nav">
          {/* <Image alt="logo" src={require("../images/wdc-circle-logo.png")} width="30" height="30" className="d-inline-block align-top" /> */}
          &ensp; Web Dev Carolina CMS
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
          </Nav>
          {userData.token != undefined ? (
            <>
            <Navbar.Text className="pr-3">Signed in as: <a>{userData.userInfo.user}</a></Navbar.Text>
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
        <Route path="/signin" component={Login} />
        <Route path='/signup' component={Signup} />
        <Route path='/projectselect' component={ProjectSelect} />
        <Route path='/home' component={Home} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/people' component={PeoplePage} />
      </Switch>
    </>
  )
};

export default NavbarContainer;