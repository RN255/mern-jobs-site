import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import leftArrow from "../assets/left-arrow-icon.png";
import locationIcon from "../assets/location.png";
import workIcon from "../assets/suitcase.png";
import money from "../assets/credit-card.png";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import { JobsList } from "../modules/JobList";

function EntryDetail() {
  const { id } = useParams();
  const [entry, setEntry] = useState({});
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const found = JobsList.find((job) => job._id === id);
    setEntry(found);
  }, [id]);

  // useEffect(() => {
  //   axios
  //     .get(`/api/entries/entries/${id}`)
  //     .then((response) => {
  //       setEntry(response.data);
  //       setDataLoaded(true);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, [id]);

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // spinner logic
  const [dataLoaded, setDataLoaded] = useState(false);

  //modal logic
  const [show, setShow] = useState(false);

  return (
    <div className="container entryDetailsPage marginForNavBar">
      <div className="row">
        {/* {dataLoaded ? ( */}
        <div className="col pt-4 mb-5 fadeIn">
          <Button
            variant="link"
            className="text-decoration-none blackText mb-2 ps-0 py-1 backButtonHover"
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
          <h2 className="blueText p-0 mx-0 mt-2 mb-2">{entry.schoolName}</h2>
          <h3 className="m-0 onePointTwoRem normalWeight d-flex align-items-center">
            <img
              src={workIcon}
              alt="work Icon"
              className="heightOnePointTwoRem me-3"
            />
            <p className="m-0 lightBlueBg rounded px-2 py-1">
              {entry.jobTitle}
            </p>
          </h3>
          <h3 className="m-0 onePointTwoRem py-1 normalWeight d-flex align-items-center">
            <img
              src={locationIcon}
              alt="location Icon"
              className="heightOnePointTwoRem me-3"
            />
            <p className="m-0 lightBlueBg rounded px-2 py-1">
              {entry.location}
            </p>
          </h3>
          <h3 className="m-0 onePointTwoRem normalWeight d-flex align-items-center">
            <img
              src={money}
              alt="location Icon"
              className="heightOnePointTwoRem me-3"
            />
            <p className="m-0 lightBlueBg rounded px-2 py-1"> {entry.salary}</p>
          </h3>
          <h3 className="blueText mt-4 mb-1 onePointTwoRem">The school</h3>
          <p className="m-0 displayLineBreaks">{entry.schoolDescription}</p>
          <h3 className="blueText mt-3 mb-1 onePointTwoRem">The Job</h3>
          <p className="m-0 displayLineBreaks">{entry.jobDescription}</p>
          <h3 className="blueText mt-3 mb-1 onePointTwoRem">Requirements</h3>
          <p className="m-0 displayLineBreaks">{entry.requirements}</p>
          <h3 className="blueText mt-3 mb-1 onePointTwoRem">Extra benefits</h3>
          <p className="m-0 displayLineBreaks">{entry.otherBenefits}</p>
          <h3 className="blueText mt-3 mb-1 onePointTwoRem">Contact email</h3>
          <a
            className="m-0 displayLineBreaks text-decoration-none text-muted fst-italic entryEmailLink"
            href={`mailto:${entry.contactEmail}`}
          >
            {entry.contactEmail}
          </a>
          {entry.website ? (
            <>
              <h3 className="blueText mt-3 mb-1 onePointTwoRem">Website</h3>
              <a
                className="m-0 displayLineBreaks text-decoration-none text-muted fst-italic entryEmailLink"
                href={`https://${entry.website}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {entry.website}
              </a>
            </>
          ) : null}
          <div className="mt-4">
            <Alert variant="info" className="custom-alert">
              <Alert.Heading>Information</Alert.Heading>
              <ul className="my-0 py-0">
                <li>
                  <p className="m-0 p-0">
                    To apply for this job please use the contact email in the
                    advert.
                  </p>
                </li>
                <li>
                  <p className="m-0 p-0">
                    Please read{" "}
                    <span
                      className="safety-modal-link fw-bold"
                      onClick={() => setShow(true)}
                    >
                      this important information
                    </span>{" "}
                    about staying safe when applying for jobs.
                  </p>
                </li>
              </ul>
            </Alert>
          </div>
        </div>
        {/* ) : (
          // Display the Spinner while data is loading
          <div className="col mt-5">
            <Spinner animation="grow" variant="info" />
          </div>
        )} */}
      </div>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-75w"
        aria-labelledby="custom-model"
      >
        <Modal.Header closeButton>
          <Modal.Title id="custom-model" className="blueText">
            Advice for job seekers
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>
            We have tried our best to check the job descriptions but you should
            still check yourself.
          </h5>
          <ul className="adviceList px-0">
            <li>
              Try to find out as much information about the school as you can.
              Search online, look for reviews, does the school have a website?
              check the school address.
            </li>
            <li>
              Check the email address of the person you're interacting with.
            </li>
            <li>
              Ask for contact details of current or previous teachers, get in
              touch and ask them about the school.
            </li>
            <li>Don't pay anything in advance.</li>
            <li>Read the contract thoroughly, check everything.</li>
            <li>
              Ask questions about the school to make sure it's right for you.
            </li>
            <li>
              Check visa process and requirements. For the most up to date
              information check official government websites.
            </li>
            <li>
              Compare to other jobs and adverts, is there anything strange? Does
              something not look right? If in doubt, say no.
            </li>
            <li>
              Don't allow yourself to be pressured into anything.{" "}
              <strong>If in doubt, say no!</strong>
            </li>
            <li>
              Consider asking for a business license, check it against
              government records.
            </li>
            <li>
              Research and educate yourself as much as you can. Look at various
              opinions and perspectives.
            </li>
          </ul>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default EntryDetail;
