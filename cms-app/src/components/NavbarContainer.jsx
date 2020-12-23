import React from 'react';
import { Navbar, Nav, Button, Image, NavDropdown } from 'react-bootstrap';
import { HashLink as HLink } from 'react-router-hash-link';
import { Route, Switch } from 'react-router-dom';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

const NavbarContainer = () => {
  return (
    <>
      <Navbar sticky="top" bg="light" variant="light" className="navbar enriq" expand="md" collapseOnSelect>
        <Navbar.Brand className="mr-auto logo-nav"> Web Dev Carolina CMS</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
          </Nav>

          <Button as={HLink} to="registration" variant="dark" className="ml-3">Signup</Button>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path='/signup' component={Signup} />
      </Switch>
    </>
  )
};

export default NavbarContainer;