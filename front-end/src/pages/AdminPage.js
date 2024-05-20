// AdminPage.js

import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../components/AuthContext";
import UnapprovedPaginatedJobList from "../components/UnapprovedPaginatedJobList";
import AdminJobList from "../components/AdminJobList";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

export default function AdminPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, logout, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      login(storedToken);
    }
  }, [login]);

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.token);
        localStorage.setItem("authToken", data.token);
      } else {
        // Handle authentication error
        console.error("Authentication failed");
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error during login:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    logout();
    setPassword("");
    setUsername("");
  };

  // logic to decide list and page number
  const [currentAdminList, setCurrentAdminList] = useState("");

  useEffect(() => {
    const storedAdminList = localStorage.getItem("currentAdminList");
    setCurrentAdminList(storedAdminList ? storedAdminList : "unapproved");
  }, []);

  return (
    <div className="container adminPage marginForNavBar">
      <div className="row">
        <div className="col mt-3">
          <Form>
            {!isAuthenticated && (
              <>
                <FloatingLabel label="Username" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FloatingLabel>
                <FloatingLabel label="Password" className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FloatingLabel>
              </>
            )}
            {!isAuthenticated && (
              <Button className="mx-1" onClick={handleLogin}>
                Login
              </Button>
            )}
          </Form>
        </div>
      </div>
      <div className="row mt-3">
        {isAuthenticated && (
          <div className="col mx-0">
            <Button
              className="me-1 mb-1"
              variant={
                currentAdminList === "approved" ? "outline-primary" : "primary"
              }
              onClick={() => {
                localStorage.setItem("currentAdminList", "unapproved");
                setCurrentAdminList("unapproved");
              }}
            >
              Unapproved jobs
            </Button>
            <Button
              className="mb-1"
              variant={
                currentAdminList === "unapproved"
                  ? "outline-primary"
                  : "primary"
              }
              onClick={() => {
                localStorage.setItem("currentAdminList", "approved");
                setCurrentAdminList("approved");
              }}
            >
              Approved jobs{" "}
            </Button>

            <Button className="admin-logout-button" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        )}
      </div>
      <div className={`mt-3 ${currentAdminList !== "" ? "" : "minListHeight"}`}>
        {isAuthenticated && currentAdminList === "unapproved" && (
          <>
            <UnapprovedPaginatedJobList></UnapprovedPaginatedJobList>
          </>
        )}
        {isAuthenticated && currentAdminList === "approved" && (
          <>
            <AdminJobList></AdminJobList>
          </>
        )}
      </div>
    </div>
  );
}
