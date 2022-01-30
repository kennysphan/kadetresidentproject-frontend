import React from 'react';
import * as reactBootstrap from 'react-bootstrap';
import Routes from './Routes';

const Navigation = (props) => {
  console.log(props);
  return (
      <reactBootstrap.Navbar bg="primary" variant="dark">
          <reactBootstrap.Navbar.Brand href="#home">Resident Scheduler</reactBootstrap.Navbar.Brand>
          <reactBootstrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
          <reactBootstrap.Navbar.Collapse id="basic-navbar-nav">
              <reactBootstrap.Nav className="mr-auto">
                  <reactBootstrap.Nav.Link href="/">Home</reactBootstrap.Nav.Link>
                  <reactBootstrap.Nav.Link href="/Settings">Settings</reactBootstrap.Nav.Link>
                  <reactBootstrap.Nav.Link href="/Rotations">Criteria</reactBootstrap.Nav.Link>
                  <reactBootstrap.Nav.Link href="/view_requests">Blackout Requests</reactBootstrap.Nav.Link>
                  <reactBootstrap.Nav.Link href="/check_availability">Check Availability</reactBootstrap.Nav.Link>
              </reactBootstrap.Nav>
          </reactBootstrap.Navbar.Collapse>
      </reactBootstrap.Navbar>
  )
}

function App() {
  return (
    <div className="App">
      <Navigation />
      <h1 className="text-uppercase text-center my-4">Resident Scheduler app</h1>
      <Routes /> 
    </div>
  );
}

export default App;