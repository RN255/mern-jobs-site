import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import locationIcon from "../assets/location.png";
import workIcon from "../assets/suitcase.png";
import money from "../assets/credit-card.png";
import { useNavigate } from "react-router-dom";

export default function PostJob() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    schoolName: "",
    jobTitle: "",
    location: "",
    salary: "",
    jobDescription: "",
    contactEmail: "",
    schoolDescription: "",
    requirements: "",
    otherBenefits: "",
    website: "",
  });

  const [validated, setValidated] = useState(false);

  // preview modal
  const [showPreview, setShowPreview] = useState(false);

  const handleClosePreview = () => setShowPreview(false);
  const handleShowPreview = () => setShowPreview(true);

  // modal stuff
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    navigate("/");
  };
  const handleShow = () => setShow(true);

  // Handler function to update the form data
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handler function for form submission
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      event.preventDefault();
      handleShowPreview();
    }
  };

  const submitDataToDatabase = () => {
    axios
      .post(
        "/api/entries/entries",
        formData
      )
      .then((response) => {
        setFormData({
          schoolName: "",
          jobTitle: "",
          location: "",
          salary: "",
          jobDescription: "",
          contactEmail: "",
          schoolDescription: "",
          requirements: "",
          otherBenefits: "",
          website: "",
        });
        setValidated(false);
        handleShow();
        // console.log(formData);
      })
      .catch((error) => {
        console.log("Did not send.");
      });
    handleClosePreview();
  };

  return (
    <div className="container postJobPage marginForNavBar mb-5">
      <div className="row">
        <div className="col">
          <h1 className="blueText mt-2 mb-4">Post a job</h1>
          <Form
            id="my-form"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Form.Group className="mb-4" controlId="input1">
              <Form.Label className="ms-0 mb-1 fw-bold">
                Name of school
              </Form.Label>
              <Form.Control
                required
                type="text"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
                className={formData.schoolName.length > 100 ? "is-invalid" : ""}
              />
              <Form.Text className="">
                {formData.schoolName.length > 100 ? (
                  <span className="text-danger">
                    Max length: 100 characters
                  </span>
                ) : null}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4" controlId="input2">
              <Form.Label className="ms-1 mb-1 fw-bold">Location</Form.Label>
              <Form.Control
                required
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={formData.location.length > 100 ? "is-invalid" : ""}
              />
              <Form.Text className="">
                {formData.location.length > 100 ? (
                  <span className="text-danger">
                    Max length: 100 characters
                  </span>
                ) : null}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4" controlId="textarea1">
              <Form.Label className="ms-1 mb-1 fw-bold">
                School Description
              </Form.Label>
              <Form.Label className="ms-1 mb-1 ms-sm-4 text-secondary">
                Please introduce your school to the candidates.
              </Form.Label>
              <Form.Control
                required
                as="textarea"
                style={{ height: "100px" }}
                name="schoolDescription"
                value={formData.schoolDescription}
                onChange={handleChange}
                className={
                  formData.schoolDescription.length > 2000 ? "is-invalid" : ""
                }
              />
              <Form.Text className="">
                {formData.schoolDescription.length > 2000 ? (
                  <span className="text-danger">
                    Max length: 2000 characters
                  </span>
                ) : null}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4" controlId="input3">
              <Form.Label className="ms-1 mb-1 fw-bold">Job title</Form.Label>
              <Form.Control
                required
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className={formData.jobTitle.length > 100 ? "is-invalid" : ""}
              />
              <Form.Text className="">
                {formData.jobTitle.length > 100 ? (
                  <span className="text-danger">
                    Max length: 100 characters
                  </span>
                ) : null}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4" controlId="input4">
              <Form.Label className="ms-1 mb-1 fw-bold">
                Salary (¥/$/€)
              </Form.Label>
              <Form.Label className="ms-1 mb-1 ms-sm-4 text-secondary">
                Examples: "$1500/month", "40,000 RMB per year"
              </Form.Label>
              <Form.Control
                required
                type="string"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className={formData.salary.length > 100 ? "is-invalid" : ""}
              />
              <Form.Text className="">
                {formData.salary.length > 100 ? (
                  <span className="text-danger">
                    Max length: 100 characters
                  </span>
                ) : null}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4" controlId="textarea2">
              <Form.Label className="ms-1 mb-1 fw-bold">
                Other Benefits
              </Form.Label>
              <Form.Label className="ms-1 mb-1 ms-sm-4 text-secondary">
                Do you provide airfare? Housing? Medical insurance?
              </Form.Label>
              <Form.Control
                required
                as="textarea"
                style={{ height: "100px" }}
                name="otherBenefits"
                value={formData.otherBenefits}
                onChange={handleChange}
                className={
                  formData.otherBenefits.length > 2000 ? "is-invalid" : ""
                }
              />
              <Form.Text className="">
                {formData.otherBenefits.length > 2000 ? (
                  <span className="text-danger">
                    Max length: 2000 characters
                  </span>
                ) : null}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4" controlId="textarea3">
              <Form.Label className="ms-1 mb-1 fw-bold">
                Job Description
              </Form.Label>
              <Form.Label className="ms-1 mb-1 ms-sm-4 text-secondary">
                Please describe the role to the candidates.
              </Form.Label>
              <Form.Control
                required
                as="textarea"
                style={{ height: "100px" }}
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
                className={
                  formData.jobDescription.length > 2000 ? "is-invalid" : ""
                }
              />
              <Form.Text className="">
                {formData.jobDescription.length > 2000 ? (
                  <span className="text-danger">
                    Max length: 2000 characters
                  </span>
                ) : null}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4" controlId="textarea4">
              <Form.Label className="ms-1 mb-1 fw-bold">
                Requirements
              </Form.Label>
              <Form.Label className="ms-1 mb-1 ms-sm-4 text-secondary">
                What do candidates need? A TEFL certificate? Teaching
                experience?
              </Form.Label>
              <Form.Control
                required
                as="textarea"
                style={{ height: "100px" }}
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                className={
                  formData.requirements.length > 2000 ? "is-invalid" : ""
                }
              />
              <Form.Text className="">
                {formData.requirements.length > 2000 ? (
                  <span className="text-danger">
                    Max length: 2000 characters
                  </span>
                ) : null}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4" controlId="input5">
              <Form.Label className="ms-1 mb-1 fw-bold">
                Contact email
              </Form.Label>
              <Form.Label className="ms-1 mb-1 ms-sm-4 text-secondary">
                Please enter an email so candidates can contact you.
              </Form.Label>
              <Form.Control
                required
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                className={
                  formData.contactEmail.length > 100 ? "is-invalid" : ""
                }
              />
              <Form.Text className="">
                {formData.contactEmail.length > 100 ? (
                  <span className="text-danger">
                    Max length: 100 characters
                  </span>
                ) : null}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4" controlId="input6">
              <Form.Label className="ms-1 mb-1 fw-bold">Website</Form.Label>
              <Form.Label className="ms-1 mb-1 ms-sm-4 px-2 text-dark greyBg rounded-pill">
                Optional
              </Form.Label>
              <Form.Control
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className={formData.website.length > 100 ? "is-invalid" : ""}
              />
              <Form.Text className="">
                {formData.website.length > 100 ? (
                  <span className="text-danger">
                    Max length: 100 characters
                  </span>
                ) : null}
              </Form.Text>
            </Form.Group>

            <div className="d-flex align-items-center">
              <Button variant="primary" type="submit">
                Preview and submit
              </Button>
              <span>
                {validated && (
                  <p className="my-auto ms-2 text-danger">Form not completed</p>
                )}
              </span>
            </div>
          </Form>
        </div>
      </div>

      <Modal
        show={showPreview}
        onHide={handleClosePreview}
        backdrop="static"
        keyboard={false}
        animation={false}
        dialogClassName="modal-90w"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <p className="m-1">Please review</p>
            <p className="m-1 text-secondary oneRem">
              This is how your advert will appear on the website
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col">
                <h2 className="blueText p-0 mx-0 mt-2 mb-2">
                  {formData.schoolName}
                </h2>
                <h3 className="m-0 onePointTwoRem normalWeight d-flex align-items-center">
                  <img
                    src={workIcon}
                    alt="work Icon"
                    className="heightOnePointTwoRem me-3"
                  />
                  {formData.jobTitle}
                </h3>
                <h3 className="m-0 onePointTwoRem py-1 normalWeight d-flex align-items-center">
                  <img
                    src={locationIcon}
                    alt="location Icon"
                    className="heightOnePointTwoRem me-3"
                  />
                  {formData.location}
                </h3>
                <h3 className="m-0 onePointTwoRem normalWeight d-flex align-items-center">
                  <img
                    src={money}
                    alt="location Icon"
                    className="heightOnePointTwoRem me-3"
                  />
                  {formData.salary}
                </h3>
                <h3 className="blueText mt-4 mb-1 onePointTwoRem">
                  The school
                </h3>
                <p className="m-0 displayLineBreaks">
                  {formData.schoolDescription}
                </p>
                <h3 className="blueText mt-3 mb-1 onePointTwoRem">The Job</h3>
                <p className="m-0 displayLineBreaks">
                  {formData.jobDescription}
                </p>
                <h3 className="blueText mt-3 mb-1 onePointTwoRem">
                  Requirements
                </h3>
                <p className="m-0 displayLineBreaks">{formData.requirements}</p>
                <h3 className="blueText mt-3 mb-1 onePointTwoRem">
                  Extra benefits
                </h3>
                <p className="m-0 mb-1 displayLineBreaks">
                  {formData.otherBenefits}
                </p>
                <h3 className="blueText mt-3 mb-1 onePointTwoRem">
                  Contact email
                </h3>
                <p className="m-0 displayLineBreaks text-decoration-none text-muted fst-italic entryEmailLink">
                  {formData.contactEmail}
                </p>
                {formData.website ? (
                  <>
                    <h3 className="blueText mt-3 mb-1 onePointTwoRem">
                      Website
                    </h3>
                    <p className="m-0 displayLineBreaks text-decoration-none text-muted fst-italic entryEmailLink">
                      {formData.website}
                    </p>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="marginAutoMobile">
          <Button variant="secondary" onClick={handleClosePreview}>
            Make changes
          </Button>
          <Button onClick={submitDataToDatabase}>Confirm and submit</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Thank you</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your job will be checked and then posted online.
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
