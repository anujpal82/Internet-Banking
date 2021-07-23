import React from "react";
import { useState } from "react";
import "../Login/login.scss";
import ProjectService from "../../Services/LoginService";
import { Navbar } from "../Navbar";
import { IoLogoTwitter } from "react-icons/io";
import {
  AiFillYoutube,
  AiFillLinkedin,
  AiFillFacebook,
  AiFillInstagram,
} from "react-icons/ai";
import background from "../Images/green_smiley.png";
import background1 from "../Images/red_smiley.png";

export const Login = (props) => {
  let tempMessage = "";
  let tempAccountNo = "";
  const [loginData, setLogindata] = useState({ userId: "", pass: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await ProjectService.login(loginData).then(async (res) => {
      console.log(res.data.token);
      localStorage.setItem("Token", res.data.token);
      tempMessage = res.data.message;
      tempAccountNo = res.data.accountNo;
    });
    if (tempMessage === "Invalid userid or Password !!!!!!!!!!!") {
      alert("Invalid userid or Password !!!!!!!!!!!");
    } else {
      alert("You Successfully Login To the system");
      props.history.push(`/Home/${tempAccountNo}`);
    }
  };
  const Register = () => {
    props.history.push("/signUp");
  };
  return (
    <>
      <Navbar></Navbar>
      <div className="container">
        <div className=" row py-5  ">
          <div className="col-md-12  col-lg-7 text-center text-lg-start ">
            <h1 className="display-4 font-weight-bold lh-1 mb-3 text-center">
              Online Internet Banking Project
            </h1>
            <div className="row">
              {" "}
              <p className="  text-center col-md-8 mx-auto ">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Blanditiis natus tempora provident maxime voluptate corrupti,
                molestiae commodi, recusandae earum beatae ullam nulla non sint.
                Nihil fugiat minus praesentium delectus consectetur impedit quas
                ratione dolorum
              </p>
            </div>
          </div>
          <div className="col-md-12  col-md-w-75 col-lg-5 ">
            <div className="row">
              <form className=" col-md-8 col-lg-12 mx-auto p-4 p-lg-5 border rounded-3 bg-light">
                <div className="form-group-sm mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter User-Id"
                    name="userId"
                    onChange={(e) => {
                      setLogindata({
                        ...loginData,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form-group-sm mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    name="pass"
                    onChange={(e) => {
                      setLogindata({
                        ...loginData,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                </div>

                <div className="row mt-3">
                  <div className="col">
                    {" "}
                    <button
                      className="w-100 btn btn-lg btn-primary"
                      onClick={handleSubmit}
                      type="submit"
                    >
                      Login
                    </button>
                  </div>
                  <div className="col text-center">
                    {" "}
                    <button
                      className="btn btn-secondary btn-lg w-100 custom"
                      onClick={Register}
                    >
                      Register
                    </button>
                  </div>
                </div>

                <hr className="my-4" />
                <small className="text-muted">
                  By clicking Sign up, you agree to the terms of use.
                </small>
              </form>
            </div>
          </div>
        </div>
      </div>
      <article className="container">
        <div className="row  mx-3 ">
          <div className=" col-md-3 g-3 card">
            <div className="border border-dark">
              <div
                className=" text-center w-100 "
                style={{
                  backgroundColor: "#c0c0c0",
                  position: "relative",
                  height: "3rem",
                }}
              >
                <img
                  src={background}
                  alt="emote"
                  style={{ position: "absolute", top: "0", left: "0" }}
                  className="mt-0 "
                />
                <span
                  class=" mt-2 text-center "
                  style={{ color: "#098809", fontWeight: "bold" }}
                >
                  ALWAYS
                </span>
              </div>
              <p className="text-center mt-3">
                keep your computer <br /> free of malware
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 g-3 card ">
            <div className="border border-dark">
              <div
                className=" text-center w-100 "
                style={{
                  backgroundColor: "#c0c0c0",
                  position: "relative",
                  height: "3rem",
                }}
              >
                <img
                  alt="emote"
                  src={background}
                  style={{ position: "absolute", top: "0", left: "0" }}
                  className="mt-0 "
                />
                <span
                  class=" mt-2 text-center "
                  style={{ color: "#098809", fontWeight: "bold" }}
                >
                  ALWAYS
                </span>
              </div>
              <p className="text-center mt-3">
                change your passwords <br /> periodically
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 g-3 card">
            <div className="border border-dark">
              <div
                className=" text-center w-100 "
                style={{
                  backgroundColor: "#c0c0c0",
                  position: "relative",
                  height: "3rem",
                }}
              >
                <img
                  alt="emote"
                  src={background1}
                  style={{ position: "absolute", top: "0", left: "0" }}
                  className="mt-0 "
                />
                <span
                  class=" mt-2 text-center text-danger "
                  style={{ fontWeight: "bold" }}
                >
                  NEVER
                </span>
              </div>
              <p className="text-center mt-3">
                respond to any communication <br /> seeking your passwords
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 g-3 card">
            <div className="border border-dark">
              <div
                className=" text-center w-100 "
                style={{
                  backgroundColor: "#c0c0c0",
                  position: "relative",
                  height: "3rem",
                }}
              >
                <img
                  alt="emote"
                  src={background1}
                  style={{ position: "absolute", top: "0", left: "0" }}
                  className="mt-0 "
                />
                <span
                  class=" mt-2 text-center text-danger "
                  style={{ fontWeight: "bold" }}
                >
                  NEVER
                </span>
              </div>
              <p className="text-center mt-3">
                reveal your passwords or <br />
                card details to anyone
              </p>
            </div>
          </div>
        </div>
      </article>
      <article className="container ">
        <p
          className="text-center text-primary mt-5"
          style={{ fontSize: "30px" }}
        >
          FOR YOUR OWN SECURITY
        </p>
        <div className="row m-4 ">
          <div class="col-md-6 ">
            <h3
              className=" text-danger h4 mt-3 "
              style={{ fontWeight: "normal" }}
            >
              Please ensure the following before logging into Online Banking
            </h3>

            <ul class="phishing_list p-3">
              <li className="mt-2">
                The URL in your browser address bar begins with "https".
              </li>
              <li>The address or status bar displays the padlock symbol.</li>
              <li>
                Click the padlock to view and verify the security certificate.
              </li>
              <li>
                The address bar turns green indicating that the site is secured
                with an SSL Certificate that meets the Extended Validation
                Standard.
              </li>
              <li>
                (SSL is compatible for IE 7.0 and above, Mozilla Firefox 3.1 and
                above, Opera 9.5 and above, Safari 3.5 and above, Google
                Chrome).
              </li>
              <li>
                The address bar turns green indicating that the site is secured
                with an SSL Certificate that meets the Extended Validation
                Standard.
              </li>
            </ul>
          </div>
          <div class="col-md-6 ">
            <h3
              className=" text-danger h4 mt-3"
              style={{ fontWeight: "normal" }}
            >
              Beware of Phishing attacks
            </h3>

            <ul class="phishing_list p-3">
              <li className="mt-2">
                Phishing is a fraudulent attempt, usually made through email,
                phone calls, SMS etc seeking your personal and confidential
                information.
              </li>
              <li>
                State Bank or any of its representative never sends you
                email/SMS or calls you over phone to get your personal
                information,password or one time SMS (high security) password.
                Any such e-mail/SMS or phone call is an attempt to fraudulently
                withdraw money from your account through Internet Banking. Never
                respond to such email/SMS or phone call. Please report
                immediately on report.phishing@sbi.co.in if you receive any such
                email/SMS or Phone call. Please lock your user access
                immediately, if you have accidentally revealed your
                credentials.Click here to lock.
              </li>
            </ul>
          </div>
        </div>
      </article>
      <article className="" id="exclusiveOffers">
        <h3 className="text-center mx-auto mt-3">
          <span> Connect With Us </span>
        </h3>
        <div>
          <div className="row text-center m-3 bg-light">
            <div className="col  " style={{ float: "left" }}>
              <a href="https://www.instagram.com/theofficialsbi/">
                <span className="h1  instagram">
                  <AiFillInstagram />
                </span>
              </a>
              <br></br>
              <span className=" instagram h5 mt-4 ml-0">Instagram</span>
            </div>
            <div className="col " style={{ float: "left" }}>
              <a href="https://www.facebook.com/StateBankOfIndia/">
                <span className="h1 facebook">
                  <AiFillFacebook />
                </span>
              </a>
              <br></br>
              <span className=" facebook h4 mt-4 ml-0">Facebook</span>
            </div>
            <div className="col " style={{ float: "left" }}>
              <a href="https://twitter.com/TheOfficialSBI">
                <span className="h1 twitter">
                  <IoLogoTwitter />
                </span>
              </a>
              <br></br>
              <span className=" twitter h4 mt-4 ml-0">Twitter</span>
            </div>
            <div className="col " style={{ float: "left" }}>
              <a href="https://www.youtube.com/user/TheOfficialSBI">
                <span className="h1 youTube">
                  <AiFillYoutube />
                </span>
              </a>
              <br></br>
              <span className=" youTube  h4 mt-4 ml-0">YouTube</span>
            </div>
            <div className="col " style={{ float: "left" }}>
              <a href="https://www.linkedin.com/company/state-bank-of-india/">
                <span className="h1 linkedIn">
                  <AiFillLinkedin />
                </span>
              </a>
              <br></br>
              <span className="  h4 mt-4 ml-0 linkedIn">linkedIn</span>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};
