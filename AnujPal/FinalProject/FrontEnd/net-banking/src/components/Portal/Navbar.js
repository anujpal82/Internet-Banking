import React from "react";
import Logo from "../Images/3.jpg";
import { ImProfile } from "react-icons/im";
// import { FaFacebookF } from "react-icons/fa";
// import { AiFillInstagram } from "react-icons/ai";
// import { AiOutlineTwitter } from "react-icons/ai";
import "./navbar.scss";

export const Navbar = (props) => {
  const { id } = props;
  // const editProfile = () => {
  //   console.log("hii");
  //   return <Redirect to={`/`} />;
  // };
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      style={{ backgroundColor: "#FFEEDB" }}
    >
      <a className="navbar-brand" href="http://localhost:3000/">
        <img height="70" width="100" alt="logo" src={Logo} />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse d-lg-flex justify-content-between     "
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav text-center pt-2 ms-4  ">
          <li className="nav-item mx-3">
            <a className="nav-link " href={`http://localhost:3000/Home/${id}`}>
              Home
            </a>
          </li>

          <li className="nav-item  mx-3">
            {/* <a class="nav-link" href={`http://localhost:3000/Portal/${id}/NEFT`}>
              Transfer
            </a> */}
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle h5"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Transfer
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a
                  class="dropdown-item"
                  href={`http://localhost:3000/Portal/${id}/NEFT`}
                >
                  Transfer Within Your Account
                </a>
                <a
                  className="dropdown-item"
                  href={`http://localhost:3000/Portal/${id}/NEFT1`}
                >
                  Transfer To Another Account
                </a>
              </div>
            </div>
          </li>
          <li class="nav-item  mx-3">
            <div class="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle h5"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Loan
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a
                  class="dropdown-item"
                  href={`http://localhost:3000/Portal/${id}/Loan`}
                >
                  Apply For Loan
                </a>
                <a
                  class="dropdown-item"
                  href={`http://localhost:3000/Portal/${id}/LoanStatus `}
                >
                  Show Loans
                </a>
              </div>
            </div>
          </li>
          <li class="nav-item  mx-3">
            <div class="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle h5"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                e-Services
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a
                  class="dropdown-item"
                  href={`http://localhost:3000/Portal/${id}/ApplyForCheque`}
                >
                  Apply For ChequeBook
                </a>
                <a
                  class="dropdown-item"
                  href={`http://localhost:3000/Portal/${id}/ApplyForDebit`}
                >
                  Apply For Debit-Card
                </a>
                <a
                  class="dropdown-item"
                  href={`http://localhost:3000/Portal/${id}/ApplyForFD `}
                >
                  Apply For Fixed-Deposit
                </a>
              </div>
            </div>
          </li>
          <li class="nav-item  mx-3">
            <div class="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle h5"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Nomination
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a
                  class="dropdown-item"
                  href={`http://localhost:3000/Portal/${id}/ApplyForNominee`}
                >
                  Apply For Nominee
                </a>
                <a
                  class="dropdown-item"
                  href={`http://localhost:3000/Portal/${id}/viewNominee`}
                >
                  View Nominee
                </a>
              </div>
            </div>
          </li>

          <li class="nav-item  mx-3">
            <a
              class="nav-link"
              href={`http://localhost:3000/Portal/${id}/Delete`}
            >
              Close A/c
            </a>
          </li>
          <li class="nav-item mx-3 ">
            <a
              class="nav-link"
              href={`http://localhost:3000/Portal/${id}/About`}
            >
              About Us
            </a>
          </li>
          <li class="nav-item mx-3 ">
            <a
              class="nav-link"
              href={`http://localhost:3000/Portal/${id}/FAQ`}
            >
              FAQ
            </a>
          </li>
          <li class="nav-item ml-5 ">
            <div className="me-auto " style={{ marginLeft: "0px" }}>
              <a
                className=" nav-link"
                href={`http://localhost:3000/Portal/${id}/editProfile`}
              >
                {/* <button className=" btn btn-sm btn-outline-secondary ">Profile</button> */}
                <ImProfile className="h2" />

                <span> Profile</span>
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};
