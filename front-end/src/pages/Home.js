import PaginatedJobList from "../components/PaginatedJobList";
import { useRef } from "react";

export default function Home() {
  const topOfList = useRef();

  return (
    <div className="container-fluid homePage">
      <div className="container paddingForNavBar">
        <div className="row pt-3">
          <div className="col withBackground rounded text-center d-flex align-items-center p-3">
            <div className="mx-auto px-3 rounded opaque-background">
              <h1 className="my-3">Find your next English teaching job here</h1>
              <div className="lead mb-4 smallScreenOneRem">
                <p>
                  Are you looking to work in ESL/EFL? Do you want to teach
                  abroad?
                </p>
                <p>
                  Whether you're an experienced English teacher or just starting
                  to dream of working and teaching somewhere around the world,
                  this is your hub for ESL job opportunities!{" "}
                </p>
                <p>
                  Get into the world of ESL/EFL and make every lesson something
                  to remember!
                </p>
                <p>
                  But don't just teach; create connections, inspire minds, and
                  have a great time along the way!
                </p>
                <p>
                  Check out the latest job postings below. Your English teaching
                  journey awaits!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4 mb-3" ref={topOfList}>
          <div className="col">
            <h1 className="blueText">Find English teaching jobs:</h1>
          </div>
        </div>
        <PaginatedJobList topOfList={topOfList}></PaginatedJobList>
      </div>
    </div>
  );
}
