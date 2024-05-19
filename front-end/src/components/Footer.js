import React from "react";
import Nav from "react-bootstrap/Nav";

export default function Footer() {
  return (
    <>
      <div className="container">
        <footer className="d-md-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <p className="col-md-4 mb-0 text-center text-md-start">
            © 2024 ESL Gateway
          </p>

          <ul className="nav col-md-4 justify-content-center justify-content-md-end">
            <li className="nav-item">
              <Nav.Link
                className="nav-link px-2 text-body-secondary"
                href="/"
                to="/"
                onClick={() => {
                  // Store the current page number in localStorage before navigating
                  sessionStorage.setItem("currentPage", "1");
                }}
              >
                Home
              </Nav.Link>
            </li>
            <li className="nav-item">
              <Nav.Link
                className="nav-link px-2 text-body-secondary"
                href="/postjob"
                to="/postjob"
              >
                Post a Job
              </Nav.Link>
            </li>
            <li className="nav-item">
              <Nav.Link
                className="nav-link px-2 text-body-secondary"
                href="/info"
                to="/info"
              >
                Info
              </Nav.Link>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
}
