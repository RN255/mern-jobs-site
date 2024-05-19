import React from "react";

export default function Info() {
  return (
    <div className="infoPage container marginForNavBar mb-5">
      <div className="row mb-4 pt-4">
        <div className="col">
          <h2 className="lightBlueText blueText">About</h2>
          <p>
            Welcome to ESL Gateway, your hub for exciting teaching opportunities
            around the globe! It doesn't matter if you're a seasoned educator or
            just embarking on your teaching journey, we're here to connect you
            with rewarding positions in the field of English language
            instruction. Dive into a world where every lesson is a chance to
            create connections, inspire minds, and make lasting memories.
            Explore our latest job postings and embark on your English teaching
            journey today!
          </p>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col">
          <h2 className="lightBlueText blueText">Contact</h2>
          <p>
            If you have any questions, complaints, suggestions or comments
            please contact us:{" "}
            <a
              href="mailto:info@eslgateway.org"
              className="text-decoration-none text-muted fst-italic entryEmailLink"
            >
              info@eslgateway.org
            </a>
          </p>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col">
          <h2 className="blueText">Advice for job seekers</h2>
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
        </div>
      </div>
    </div>
  );
}
