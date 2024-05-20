import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import axios from "axios";
import locationIcon from "../assets/location.png";
import workIcon from "../assets/suitcase.png";
import money from "../assets/credit-card.png";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import leftArrow from "../assets/left-arrow-icon.png";
import { AuthContext } from "../components/AuthContext";

function EntryDetail() {
  const { id } = useParams();
  const [entry, setEntry] = useState({});
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  //modal logic
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get(`/api/entries/entries/${id}`)
      .then((response) => {
        setEntry(response.data);
        setDataLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  //function to truncate Id
  const truncateId = (id) => {
    if (id.length > 4) {
      return id.slice(-4);
    } else {
      return id;
    }
  };

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Function to handle approve
  const handleApprove = () => {
    axios
      .put(`/api/entries/entries/${id}`, {
        approved: true,
      })
      .then((response) => {
        console.log("Approval status updated successfully");
        // Redirect to another page
        navigate(-1);
      })
      .catch((error) => {
        console.error("Error updating approval status:", error);
      });
  };

  // Function to handle delete
  const handleDelete = () => {
    axios
      .delete(`/api/entries/entries/${id}`)
      .then((response) => {
        console.log("Entry deleted successfully");
        // Redirect to another page
        navigate(-1);
      })
      .catch((error) => {
        console.error("Error deleting entry:", error);
      });
    setShow(false);
  };

  // spinner logic
  const [dataLoaded, setDataLoaded] = useState(false);

  // are we authenticated?
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="container marginForNavBar">
      {dataLoaded && isAuthenticated ? (
        <>
          <div className="row mb-5">
            <div className="col pt-4">
              <Button
                variant="link"
                className="text-decoration-none blackText mb-2 ps-0 py-1"
                onClick={goBack}
              >
                <p className="d-flex align-items-center m-0">
                  <img
                    src={leftArrow}
                    alt="back angle icon"
                    className="heightOneRem p-0 me-1"
                  />{" "}
                  Back
                </p>
              </Button>
              <p className="mb-0 pt-3 border-top">
                {formatDate(entry.dateCreated)}
              </p>
              <h2 className="blueText p-0 mx-0 mt-2 mb-2">
                {entry.schoolName} <span>({truncateId(entry._id)})</span>
              </h2>
              <h3 className="m-0 onePointTwoRem normalWeight d-flex align-items-center">
                <img
                  src={workIcon}
                  alt="work Icon"
                  className="heightOnePointTwoRem me-3"
                />
                {entry.jobTitle}
              </h3>
              <h3 className="m-0 onePointTwoRem py-1 normalWeight d-flex align-items-center">
                <img
                  src={locationIcon}
                  alt="location Icon"
                  className="heightOnePointTwoRem me-3"
                />
                {entry.location}
              </h3>
              <h3 className="m-0 onePointTwoRem normalWeight d-flex align-items-center">
                <img
                  src={money}
                  alt="location Icon"
                  className="heightOnePointTwoRem me-3"
                />
                {entry.salary}
              </h3>
              <h3 className="blueText mt-4 mb-1 onePointTwoRem">The school</h3>
              <p className="m-0 displayLineBreaks">{entry.schoolDescription}</p>
              <h3 className="blueText mt-3 mb-1 onePointTwoRem">The Job</h3>
              <p className="m-0 displayLineBreaks">{entry.jobDescription}</p>
              <h3 className="blueText mt-3 mb-1 onePointTwoRem">
                Requirements
              </h3>
              <p className="m-0 displayLineBreaks">{entry.requirements}</p>
              <h3 className="blueText mt-3 mb-1 onePointTwoRem">
                Extra benefits
              </h3>
              <p className="m-0 displayLineBreaks">{entry.otherBenefits}</p>
              <h3 className="blueText mt-3 mb-1 onePointTwoRem">
                Contact email
              </h3>
              <a
                className="m-0 displayLineBreaks text-decoration-none text-muted fst-italic entryEmailLink"
                href={`mailto:${entry.contactEmail}`}
              >
                {entry.contactEmail}
              </a>
              {entry.website ? (
                <>
                  <h3 className="blueText mt-3 mb-1 onePointTwoRem">Website</h3>
                  <p className="m-0 displayLineBreaks text-decoration-none text-muted fst-italic entryEmailLink">
                    {entry.website}
                  </p>
                </>
              ) : null}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Button onClick={handleApprove} className="me-1">
                Approve
              </Button>
              <Button onClick={handleShow} className="me-1">
                Delete
              </Button>
              <Button>
                <Link
                  to={`/editentry/${entry._id}`}
                  className="text-decoration-none text-white"
                >
                  Edit
                </Link>
              </Button>

              <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                  <Modal.Title className="text-danger text-uppercase">
                    Strong Warning!
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Do you want to{" "}
                  <span className="fw-bold text-uppercase text-danger">
                    delete
                  </span>{" "}
                  this?
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-between">
                  <Button
                    variant="outline-success"
                    className="m-0"
                    onClick={handleClose}
                  >
                    No, do not delete
                  </Button>
                  <Button
                    variant="danger"
                    className="m-0"
                    onClick={handleDelete}
                  >
                    Yes, I want to delete
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </>
      ) : dataLoaded && !isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        // Display the Spinner while data is loading
        <div className="col">
          <Spinner animation="grow" variant="info" />
        </div>
      )}
    </div>
  );
}

export default EntryDetail;
