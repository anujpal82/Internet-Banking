import { React, useEffect, useState } from "react";
import { AiOutlineCopyright } from "react-icons/ai";
import { Navbar } from "../components/Portal/Navbar";
import { MdAccountBalanceWallet } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import ProjectService from "../Services/LoginService";
import Logo from "../components/Images/bank.jpg";
import FireBase from "../Fire-Base/FireBase";
import { Carousel } from "react-bootstrap";
import image1 from "../components/Images/24.jpg";
import image2 from "../components/Images/25.jpg";
import image3 from "../components/Images/26.jpg";
export const NEFT = (props) => {
  var todayDate = new Date();
  var lastUpdateddate = `${todayDate.getDate()}/${todayDate.getMonth() + 1
    }/${todayDate.getFullYear()}`;
  const [customer, setCustomer] = useState({});
  const [state, setstate] = useState(false);
  const [formError, setFormError] = useState({ amountError: "" });
  const [formFlag, setFormFlag] = useState({ amountError: false });
  const [CRN, setCRN] = useState([]);
  const [NEFT, setNEFT] = useState({
    debitAccountNo: "default",
    creditAccountNo: "default",
    amount: "",
  });
  const formValidation = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "amount":
        if (value < 100) {
          setFormError({
            ...formError,
            amountError: "amount cannot be less than 100",
          });
          setFormFlag({ ...formFlag, amountError: false });
        } else {
          setFormError({ ...formError, amountError: "" });
          setFormFlag({ ...formFlag, amountError: true });
        }

        break;

      default:
        break;
    }
  };

  useEffect(() => {
    ProjectService.getCustomer(props.match.params.id).then((res) => {
      setCustomer(res.data[0]);
    });
    ProjectService.getCustomerByCRN({ CRN: customer.CRN }).then((res1) => {
      setCRN(res1.data);
    });
    setstate(false);
  }, [
    state,
    customer.balance,
    customer.CRN,
    props.match.params.id,
    NEFT.debitAccountNo,
  ]);

  const LogOut = (e) => {
    localStorage.clear();
    props.history.push("/");
  };
  const Submit = async (e) => {
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
            ProjectService.NEFT(NEFT)
              .then((res1) => {
                console.log(res1.data);
                alert("Successfully fund transferred");
                setNEFT({
                  debitAccountNo: "a",
                  creditAccountNo: "b",
                  amount: "",
                });

              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            alert(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
    setstate(true);
  };
  return (
    <>
      <Navbar id={props.match.params.id} />
      <div className="container">
        <div className="row ">
          <div className="col ">
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
              <span className="me-5 h2" onClick={LogOut}>
                {" "}
                <FiLogOut />
              </span>
              <br></br>
              <span className="h6 ">Logout</span>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-10 m-4 col-lg-5">
            <form class="p-4 p-md-5 border rounded-3 bg-light" id="Form">
              <h3 className="text-center mb-5">NEFT</h3>
              <div class="form-group-sm mb-3">
                <select value={NEFT.debitAccountNo}
                  className="form-control"
                  onChange={(e) => {
                    setNEFT({ ...NEFT, debitAccountNo: e.target.value });
                  }}
                >
                  <option value="default" selected>
                    {" "}
                    debit Account Number
                  </option>
                  {CRN.map((item, key) => {
                    return <option key={key}>{item.accountNo}</option>;
                  })}
                </select>
              </div>
              <div class="form-group-sm mb-3">
                <select value={NEFT.creditAccountNo}
                  className="form-control"
                  onChange={(e) => {
                    setNEFT({ ...NEFT, creditAccountNo: e.target.value });
                  }}
                >
                  <option value="default" selected>
                    {" "}
                    Credit Account Number
                  </option>

                  {CRN.map((item, key) => {
                    return (
                      <option
                        disabled={
                          item.accountNo === parseInt(NEFT.debitAccountNo)
                            ? true
                            : null
                        }
                        key={key}
                      >
                        {item.accountNo}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div class="form-group-sm mb-3">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Amount"
                  name="amount"
                  value={NEFT.amount}
                  onInput={formValidation}
                  onChange={(e) => {
                    setNEFT({ ...NEFT, [e.target.name]: e.target.value });
                  }}
                />
                <span className="text-danger">
                  <small>{formError.amountError}</small>
                </span>
              </div>
              <div id="recaptcha-container"></div>

              <button
                class="w-100 btn btn-lg btn-primary mt-3 "
                type="submit"
                onClick={Submit}
                disabled={formFlag.amountError === false ? true : false}
              >
                Submit
              </button>
              <hr class="my-4" />
            </form>
          </div>
          <div class=" col m-4 card card border-0" style={{ width: "18rem" }}>
            <img class="card-img-top" src={Logo} alt="Card  cap" />
            <div class="card-body">
              <h5 class="card-title text-center">About Our Bank</h5>
              <p class="card-text mt-3">
                Some quick example text to build on the card title and make up
                the bulk of the card's content. Some quick example text to build
                on the card title and make up the bulk of the card's content.
                Some quick example text to build on the card title and make up
                the bulk of the card's content. Some quick example text to build
                on the card title and make up the bulk of the card's content.
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div class=" col-lg-11 m-4 card card border-0 mx-auto">
          <Carousel>
            <Carousel.Item className="">
              <img
                style={{ marginTop: "50px", height: "300px" }}
                className="d-block w-100"
                src={image1}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                style={{ marginTop: "50px", height: "300px" }}
                className="d-block w-100"
                src={image2}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                style={{ marginTop: "50px", height: "300px" }}
                className="d-block w-100  card-img-top"
                src={image3}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>
      </div>

      <hr className="bg-secondary fw-bold" />
      <article className="container mb-5 ">
        <div className="row">
          <div className="col">
            <small className="ml-3">Last Updated On :</small>
            <small className="ml-2 ">{lastUpdateddate}</small>
            <small className="ml-3 ">|</small>
            <small className="ml-3 ">Visitors : 27591024</small>
          </div>

          <div className="col">
            <small className="float-right mr-3">
              Copyright <AiOutlineCopyright /> {todayDate.getFullYear()}{" "}
              Internet Banking project.All Rights Reserved{" "}
            </small>
          </div>
        </div>
      </article>
    </>
  );
};
