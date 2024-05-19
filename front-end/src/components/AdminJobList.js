import React, { useEffect, useState } from "react";
import axios from "axios";
import locationIcon from "../assets/location.png";
import workIcon from "../assets/suitcase.png";
import money from "../assets/credit-card.png";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Pagination from "react-bootstrap/Pagination";
import Alert from "react-bootstrap/Alert";

export default function AdminJobList() {
  // get the job postings from the database
  const [data, setData] = useState([]);
  useEffect(() => {
    // set list page if one exists
    const storedPage = localStorage.getItem("currentAdminApprovedListPage");
    setCurrentPage(storedPage ? parseInt(storedPage, 10) : 1);

    axios
      .get("https://jobs-yong-zhong.onrender.com/api/entries/entries")
      .then((response) => {

        // Sort data based on the selected order
        const sortedData = response.data
          .filter((post) => post.approved)
          .sort((a, b) => {
            // Sort in descending order by comparing the timestamps.
            return new Date(b.dateCreated) - new Date(a.dateCreated);
          });

        setData(sortedData);
        setDataLoaded(true);

        // console.log(response.data);
      })
      .catch((error) => {
        // Handle any errors here
        console.error(error);
      });
  }, []);

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  //function to truncate text
  const truncateDescription = (text) => {
    if (text.length > 150) {
      return text.slice(0, 150) + "...";
    } else {
      return text;
    }
  };

  //function to truncate Id
  const truncateId = (id) => {
    if (id.length > 4) {
      return id.slice(-4);
    } else {
      return id;
    }
  };

  //pagination stuff
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [displayData, setDisplayData] = useState([]);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayData(data.slice(startIndex, endIndex));
  }, [data, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    localStorage.setItem("currentAdminApprovedListPage", newPage);
  };

  // spinner logic
  const [dataLoaded, setDataLoaded] = useState(false);

  // bootstrap pagination
  let active = currentPage;
  let items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => {
          handlePageChange(number);
        }}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div className={`row ${totalPages === currentPage ? "" : "minListHeight"}`}>
      {dataLoaded ? (
        <div className="col fadeIn">
          <div className="row">
            <div className="col">
              <Alert variant="danger">
                <Alert.Heading>Warning</Alert.Heading>
                <p>
                  This is a list of already{" "}
                  <span className="fw-bold">approved jobs</span>. These jobs are
                  already visible on the website. Editing them or deleting them
                  may lead to bad things!
                </p>
              </Alert>
            </div>
          </div>

          <div>
            <Pagination size="sm">
              <Pagination.Prev
                onClick={() => {
                  handlePageChange(currentPage - 1);
                }}
                disabled={currentPage === 1}
              />
              <Pagination size="sm">{items}</Pagination>
              <Pagination.Next
                onClick={() => {
                  handlePageChange(currentPage + 1);
                }}
                disabled={currentPage * itemsPerPage >= data.length}
              />
            </Pagination>
          </div>

          <div>
            <Button
              className="me-1 mb-1"
              onClick={() => {
                handlePageChange(currentPage - 1);
              }}
              disabled={currentPage === 1}
            >
              Previous Page
            </Button>
            <Button
              className="me-1 mb-1"
              onClick={() => {
                handlePageChange(currentPage + 1);
              }}
              disabled={currentPage * itemsPerPage >= data.length}
            >
              Next Page
            </Button>
            <Button
              className="mb-1"
              onClick={() => {
                handlePageChange(1);
              }}
              disabled={currentPage === 1}
            >
              Return to page one
            </Button>
          </div>

          <ul>
            {displayData.map((entry) => (
              <li key={entry._id}>
                <Card className="my-2 custom-card">
                  <Link
                    to={`/adminapprovedentry/${entry._id}`}
                    className="text-decoration-none"
                  >
                    <Card.Body className="border-bottom">
                      <Card.Text className="blueText m-0 onePointFiveRem">
                        {entry.schoolName}{" "}
                        <span>({truncateId(entry._id)})</span>
                      </Card.Text>

                      <Card.Text className="blackText m-0 d-flex align-items-center">
                        <img
                          src={workIcon}
                          alt="work Icon"
                          className="heightOneRem me-2"
                        />
                        {entry.jobTitle}
                      </Card.Text>
                      <Card.Text className="blackText m-0 d-flex align-items-center">
                        <img
                          src={locationIcon}
                          alt="location Icon"
                          className="heightOneRem me-2"
                        />
                        {entry.location}
                      </Card.Text>

                      <Card.Text className="blackText m-0 d-flex align-items-center">
                        <img
                          src={money}
                          alt="location Icon"
                          className="heightOneRem me-2"
                        />
                        {entry.salary}
                      </Card.Text>

                      <Card.Text className="blackText mt-1 mb-0">
                        {truncateDescription(entry.jobDescription)}
                      </Card.Text>
                      <Card.Text className="lightGreyText zeroPointEightRem mt-1 mb-0">
                        {formatDate(entry.dateCreated)}
                      </Card.Text>
                    </Card.Body>
                  </Link>
                </Card>
              </li>
            ))}
          </ul>

          <div>
            <Pagination size="sm">
              <Pagination.Prev
                onClick={() => {
                  handlePageChange(currentPage - 1);
                }}
                disabled={currentPage === 1}
              />
              <Pagination size="sm">{items}</Pagination>
              <Pagination.Next
                onClick={() => {
                  handlePageChange(currentPage + 1);
                }}
                disabled={currentPage * itemsPerPage >= data.length}
              />
            </Pagination>
          </div>

          <div className="mb-5">
            <Button
              className="me-1 mb-1"
              onClick={() => {
                handlePageChange(currentPage - 1);
              }}
              disabled={currentPage === 1}
            >
              Previous Page
            </Button>
            <Button
              className="me-1 mb-1"
              onClick={() => {
                handlePageChange(currentPage + 1);
              }}
              disabled={currentPage * itemsPerPage >= data.length}
            >
              Next Page
            </Button>
            <Button
              className="mb-1"
              onClick={() => {
                handlePageChange(1);
              }}
              disabled={currentPage === 1}
            >
              Return to page one
            </Button>
          </div>
        </div>
      ) : (
        // Display the Spinner while data is loading
        <div className="col">
          <Spinner animation="grow" variant="info" />
        </div>
      )}
    </div>
  );
}
