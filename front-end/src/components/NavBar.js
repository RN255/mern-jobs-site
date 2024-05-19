import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import workIcon from "../assets/world2.png";

export default function NavBar() {
  return (
    <>
      <Navbar
        collapseOnSelect
        key="md"
        expand="md"
        className="navBar"
        fixed="top"
      >
        <Container fluid>
          <Navbar.Brand>
            <Nav.Link
              href="/"
              to="/"
              className="navLogo d-flex text-white"
              onClick={() => {
                // Store the current page number in localStorage before navigating
                sessionStorage.setItem("currentPage", "1");
              }}
            >
              <img
                src={workIcon}
                alt="work Icon"
                className="my-auto heightTwoRem me-2"
              />
              <p className="my-auto lead">ESL Gateway</p>
            </Nav.Link>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-md`}
            className="border-0 shadow-none"
          />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-md`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
            placement="end"
            className="navBar"
          >
            <Offcanvas.Header closeButton data-bs-theme="dark">
              <Offcanvas.Title
                id={`offcanvasNavbarLabel-expand-md`}
                className="text-light"
              >
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link
                  href="/"
                  to="/"
                  className="navLink hoverBlueText heavy text-white me-1"
                  onClick={() => {
                    // Store the current page number in localStorage before navigating
                    sessionStorage.setItem("currentPage", "1");
                  }}
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  href="/postjob"
                  to="/postjob"
                  className="navLink me-1 hoverBlueText heavy text-white"
                >
                  Post a job
                </Nav.Link>
                <Nav.Link
                  href="/info"
                  to="/info"
                  className="navLink hoverBlueText heavy text-white"
                >
                  Info
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
