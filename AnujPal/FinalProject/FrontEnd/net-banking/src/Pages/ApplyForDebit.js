import React, { useEffect, useState } from "react";
import { AiOutlineCopyright } from "react-icons/ai";
import { Navbar } from "../components/Portal/Navbar";
import ProjectService from "../Services/LoginService";
import FireBase from "../Fire-Base/FireBase";
import { MdAccountBalanceWallet } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { Carousel } from "react-bootstrap";

export const ApplyForDebit = (props) => {
  var todayDate = new Date()
  var lastUpdateddate = `${todayDate.getDate()}/${todayDate.getMonth() + 1}/${todayDate.getFullYear()}`
  const [customer, setustomer] = useState({});
  const [cardType, setcardType] = useState({ cardType: "Visa" });
  //   const [debitCard, setDebitCard] = useState({
  //     accountNo: customer.accountNo,
  //     CRN: customer.CRN,
  //     address: customer.address,
  //     name: `${customer.fname} ${customer.mname} ${customer.lname}`,
  //     cardType:""
  //   });

  useEffect(() => {
    ProjectService.getCustomer(props.match.params.id).then((res) => {
      setustomer(res.data[0]);
    });
  }, [props.match.params.id]);
  const LogOut = (e) => {
    localStorage.clear();
    props.history.push("/");
  };
  const Apply = async (e) => {
    e.preventDefault();
    let recaptcha = new FireBase.auth.RecaptchaVerifier("recaptcha-container");
    let number = "+918128501852";
    await FireBase.auth()
      .signInWithPhoneNumber(number, recaptcha)
      .then((res) => {
        let code = prompt("enter otp", "");
        if (code == null) return;
        res
          .confirm(code)
          .then((result) => {
            ProjectService.addDebitCardRequest({
              CRN: customer.CRN,
              accountNo: customer.accountNo,
              address: customer.address,
              cardType: cardType.cardType,
              name: `${customer.fname} ${customer.mname} ${customer.lname}`,
            }).then((res) => {
              console.log(res.data);
              alert(
                "Debit Card Will be Deliverd to Your Registered Address Sortly"
              );
            });
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <>
      <Navbar id={props.match.params.id} />
      {/* <div className="container">
        <div className="row m-3">
          <div className="col mt-2">
            <h3 className="text-center ">
              Mr {customer.fname} {customer.mname} {customer.lname}
            </h3>
          </div>
          <div className="col   ">
            <span className="h2">
              <MdAccountBalanceWallet />
            </span>{" "}
            <span className="ml-2 h4">{customer.balance}</span>{" "}
            <span className="h4 pull-right">
              <FaRupeeSign />
            </span>
            <div style={{ float: "right" }}>
              <span className="mr-2 h2" onClick={LogOut}>
                {" "}
                <FiLogOut />
              </span>
              <br></br>
              <span className="h6 ">Logout</span>
            </div>
          </div>
        </div>
      </div> */}
      <div className="row m-4">
        <div className="col-md-6 mx-auto ">
          <form className="bg-light p-4 m-4 mt-5" id="signUpForm">
            <h3 className="text-center mb-5 ">Apply For Debit Card</h3>
            <div className="mt-3 text-success mb-1"> Account Number</div>
            <input
              type="text"
              placeholder="Accout No"
              className="form-control"
              value={customer.accountNo}
            />
            <div className="mt-3 text-success mb-1 "> CRN</div>
            <input
              type="text"
              placeholder="CRN"
              className="form-control"
              value={customer.CRN}
            />
            <div className="mt-3 text-success mb-1">
              This Name Is Printed On Debit Card
            </div>
            <input
              type="text"
              placeholder="Accout No"
              className="form-control "
              value={`${customer.fname} ${customer.mname} ${customer.lname}`}
            />
            <div className="mt-3 text-success mb-1 ">
              At This Address Card Will Be Deliver
            </div>
            <textarea
              type="text"
              placeholder="Address"
              className="form-control"
              value={customer.address}
            />
            <div className="mt-3 text-success mb-1 "> Type Of Card</div>
            <select
              className="form-control"
              onChange={(e) => {
                setcardType({ cardType: e.target.value });
              }}
            >
              <option>Rupaya</option>
              <option>Visa</option>
              <option>MasterCard</option>
            </select>
            <div
              id="recaptcha-container"
              data-size="compact"
              style={{ width: "400px" }}
            ></div>
            <button
              type="button"
              className="btn btn-primary w-100 mt-4"
              onClick={Apply}
            >
              Apply
            </button>
          </form>
        </div>
        <div className="col mt-5 ">
          <div className="row">
            <div class=" col-lg-11 m-4 card card border-0 mx-auto">
              <Carousel interval={3000}>
                <Carousel.Item className="">
                  <img
                    style={{ marginTop: "50px", height: "400px" }}
                    className="d-block w-100"
                    src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80"
                    alt="First slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    style={{ marginTop: "50px", height: "400px" }}
                    className="d-block w-100"
                    src="https://images.unsplash.com/photo-1585915473635-d4e5c564eec3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=749&q=80"
                    alt="Second slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    style={{ marginTop: "50px", height: "400px" }}
                    className="d-block w-100  card-img-top"
                    src="https://images.unsplash.com/photo-1609429019995-8c40f49535a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=749&q=80"
                    alt="Third slide"
                  />
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        </div>
      </div>

      <hr className="bg-secondary" />
      <article className="container mb-5 ">
        <div className="row">
          <div className="col">
            <small className="ml-3">Last Updated On :</small><small className="ml-2 ">{lastUpdateddate}</small>
            <small className="ml-3 ">|</small>
            <small className="ml-3 ">Visitors : 27591024</small>
          </div>


          <div className="col">
            <small className="float-right mr-3">Copyright <AiOutlineCopyright /> {todayDate.getFullYear()} Internet Banking project.All Rights Reserved </small>
          </div>
        </div>

      </article>
    </>
  );
};
