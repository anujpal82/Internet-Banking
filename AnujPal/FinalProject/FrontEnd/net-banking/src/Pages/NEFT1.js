import { useEffect, useState } from "react";
import React from "react";
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
import { ImCross } from "react-icons/im";
import { BiTransferAlt } from "react-icons/bi";

export const NEFT1 = (props) => {
  var todayDate = new Date();
  var lastUpdateddate = `${todayDate.getDate()}/${todayDate.getMonth() + 1
    }/${todayDate.getFullYear()}`;
  const [ben, setBen] = useState([]);
  const [state1, setstate1] = useState(false);
  const [Transfer, setTransfer] = useState(false);
  const [customer, setCustomer] = useState({});
  const [formError, setFormError] = useState({ amountError: "" });
  const [addBenError, setAddBenError] = useState({ fnameError: "", mnameError: "", lnameError: "", CRNError: "", accountNoError: "", IFSCError: "" })
  const [formFlag, setFormFlag] = useState({ amountError: false, fnameError: false, mnameError: false, lnameError: false, CRNError: false, accountNoError: false, IFSCError: false })
  const [NEFT, setNEFT] = useState({
    debitAccountNo: "",
    creditAccountNo: "",
    amount: "",
  });
  const [addBenificiary, setAddBenificiary] = useState({
    fname: "",
    mname: "",
    lname: "",
    accountNo: "",
    IFSC: "",
    CRN: "",
  });
  const [CRN, setCRN] = useState([]);

  useEffect(() => {
    ProjectService.getCustomer(props.match.params.id).then((res) => {
      setCustomer(res.data[0]);
    });
    ProjectService.getCustomerByCRN({ CRN: customer.CRN }).then(
      async (res1) => {
        setCRN(res1.data);
      }
    );
    ProjectService.getBenificiary().then((res) => {
      setBen(res.data);
    });
  }, [customer, props.match.params.id]);
  const Register = (e) => {
    e.preventDefault();
    ProjectService.AddBenificiary(addBenificiary)
      .then((res) => {
        console.log(res.data);
        alert("Successfully Register");
        setAddBenificiary({
          fname: "",
          mname: "",
          lname: "",
          accountNo: "",
          CRN: "",
          IFSC: ""
        })
        setstate1(!state1)
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const formValidation = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "amount":
        if (value < 100) {
          setFormError({
            ...formError,
            amountError: "amount cannot be less than 100",
          });
          setFormFlag({ ...formFlag, amountError: false })
        } else {
          setFormError({ ...formError, amountError: "" });
          setFormFlag({ ...formFlag, amountError: true })
        }

        break;
      case "fname":
        var pattern = new RegExp("^[a-zA-Z]+$");
        if (value.length < 3) {
          setAddBenError({ ...addBenError, fnameError: "Minimum 3 character required" })
          setFormFlag({ ...formFlag, fnameError: false })
        }
        else {
          setAddBenError({ ...addBenError, fnameError: "" })
          setFormFlag({ ...formFlag, fnameError: true })
        }
        break;
      case "mname":
        if (value.length < 3) {
          setAddBenError({ ...addBenError, mnameError: "Minimum 3 character required" })
          setFormFlag({ ...formFlag, mnameError: false })
        }
        else {
          setAddBenError({ ...addBenError, mnameError: "" })
          setFormFlag({ ...formFlag, mnameError: true })
        }
        break;
      case "lname":
        if (value.length < 3) {
          setAddBenError({ ...addBenError, lnameError: "Minimum 3 character required" })
          setFormFlag({ ...formFlag, lnameError: false })
        }
        else {
          setAddBenError({ ...addBenError, lnameError: "" })
          setFormFlag({ ...formFlag, lnameError: true })
        }
        break;
      case "CRN":
        var pattern1 = new RegExp("^[0-9]+$", "g");
        if (value.length <= 2) {
          setAddBenError({ ...addBenError, CRNError: "minimum 3 digit required" });
          setFormFlag({ ...formFlag, CRNError: false })
        } else if (!pattern1.test(value)) {
          setAddBenError({ ...addBenError, CRNError: "Only digits are allowed" });
          setFormFlag({ ...formFlag, CRNError: false })
          // setFormFlag({ ...formFlag, CRNFlag: false });
        } else {
          setAddBenError({ ...addBenError, CRNError: "" });
          setFormFlag({ ...formFlag, CRNError: true })
        }
        break;
      case "accountNo":
        var pattern2 = new RegExp("^[0-9]+$");
        if (value.length < 3) {
          setAddBenError({
            ...addBenError,
            accountNoError: "Account number should be atleast 3 digit",
          });
          setFormFlag({ ...formFlag, accountNoError: false })
        } else {
          setAddBenError({
            ...addBenError,
            accountNoError: "",
          });
          setFormFlag({ ...formFlag, accountNoError: true })
        }
        break;
      case "IFSC":
        var pattern4 = new RegExp("^[A-Za-z0-9_-]*$");
        if (value.length <= 3) {
          setAddBenError({
            ...addBenError,
            IFSCError: "minimum 4 character required",
          });
          setFormFlag({ ...formFlag, IFSCError: false })
        } else if (!pattern4.test(value)) {
          setAddBenError({
            ...addBenError,
            IFSCError: "only digits and letters allowed",
          });
          setFormFlag({ ...formFlag, IFSCError: false })
        } else {
          setAddBenError({ ...addBenError, IFSCError: "" });
          setFormFlag({ ...formFlag, IFSCError: true })
        }
        break;
      default:
        break;
    }
  };

  const LogOut = (e) => {
    localStorage.clear();
    props.history.push("/");
  };
  const addBenefciary = (e) => {
    setstate1(!state1);
  };
  const TransferMoney = () => {
    setTransfer(!Transfer);
  };
  const Submit = async (e) => {
    e.preventDefault();
    let recaptcha = new FireBase.auth.RecaptchaVerifier("recaptcha-container");
    let number = "+918128501852";
    FireBase.auth()
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
                alert("succesfully fund transferred !!!!!!!!!")
                setNEFT({ debitAccountNo: "default", creditAccountNo: "default", amount: "" })
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
    // setstate(true);
  };
  const Remove = (id) => {
    ProjectService.deleteBenificiary({ _id: id }).then((res) => {
      console.log(res.data);
    });
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

        <div className="row mt-3  m-3">
          <div className="col-md-10  col-lg-5">
            <h3 className="text-center mb-5 mt-3">Beneficiary</h3>
            <table className="table mt-2">
              <tr className="text-center">
                <td>Account Number</td>
                <td>Name</td>
                <td>IFSC</td>
                <td colSpan="2">Action</td>
              </tr>
              {ben.map((item) => {
                return (
                  <tr className="p-5 text-center">
                    <td>{item.accountNo}</td>
                    <td>
                      {item.fname} {item.mname} {item.lname}
                    </td>
                    <td>{item.IFSC}</td>
                    <td>
                      <button className="btn   " onClick={TransferMoney}>
                        <BiTransferAlt className="h3 text-success" />
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn text-danger"
                        onClick={() => {
                          Remove(item._id);
                        }}
                      >
                        <ImCross className="h6" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </table>{" "}
            <div className="text-center">
              {" "}
              <button
                className="btn btn-secondary mt-3 text-center w-50"
                onClick={addBenefciary}
              >
                Add Beneficiary
              </button>
            </div>
          </div>

          <div class=" col m-4 card card border-0 " style={{ width: "18rem" }}>
            <img class="card-img-top" src={Logo} alt="Card  cap" />
            <div class="card-body">
              <h5 class="card-title text-center">About Our Bank</h5>
              <p class="card-text mt-3">
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 mx-auto   ">
          {state1 ? (
            <div className=" mt-5" id="addBenificiary">
              <form
                className="bg-light p-4 m-4 mt-5 "
                id="addBenficiaryForm"
              >
                <h3 className="text-center mb-5 ">Beneficiary Register Form</h3>
                <div className="row">
                  <div className="col">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="form-control"
                      name="fname"
                      value={addBenificiary.fname}
                      onInput={formValidation}
                      onChange={(e) => {
                        setAddBenificiary({
                          ...addBenificiary,
                          [e.target.name]: e.target.value,
                        });
                      }}
                    ></input>
                    <span className="text-danger"><small>{addBenError.fnameError}</small></span>
                  </div>
                  <div className="col">
                    {" "}
                    <input
                      type="text"
                      placeholder="Middle Name"
                      className="form-control"
                      value={addBenificiary.mname}
                      onChange={(e) => {
                        setAddBenificiary({
                          ...addBenificiary,
                          [e.target.name]: e.target.value,
                        });
                      }}
                      name="mname"
                      onInput={formValidation}
                    ></input>
                    <span className="text-danger"><small>{addBenError.mnameError}</small></span>
                  </div>
                  <div className="col">
                    {" "}
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="form-control"
                      onInput={formValidation}
                      value={addBenificiary.lname}
                      onChange={(e) => {
                        setAddBenificiary({
                          ...addBenificiary,
                          [e.target.name]: e.target.value,
                        });
                      }}
                      name="lname"
                    ></input>
                    <span className="text-danger"><small>{addBenError.lnameError}</small></span>
                  </div>
                </div>
                <input
                  type="text"
                  className="form-control mt-3"
                  placeholder="Customer Relationship Number"
                  name="CRN"
                  onInput={formValidation}
                  value={addBenificiary.CRN}
                  onChange={(e) => {
                    setAddBenificiary({
                      ...addBenificiary,
                      [e.target.name]: e.target.value,
                    });
                  }}
                ></input>
                <span className="text-danger"><small>{addBenError.CRNError}</small></span>
                <input
                  type="text"
                  className="form-control mt-3"
                  placeholder="Account Number"
                  name="accountNo"
                  onInput={formValidation}
                  value={addBenificiary.accountNo}
                  onChange={(e) => {
                    setAddBenificiary({
                      ...addBenificiary,
                      [e.target.name]: e.target.value,
                    });
                  }}
                ></input>
                <span className="text-danger"><small>{addBenError.accountNoError}</small></span>

                <input
                  type="text"
                  className="form-control mt-3"
                  placeholder="IFSC Code"
                  name="IFSC"
                  value={addBenificiary.IFSC}
                  onInput={formValidation}
                  onChange={(e) => {
                    setAddBenificiary({
                      ...addBenificiary,
                      [e.target.name]: e.target.value,
                    });
                  }}
                ></input>
                <span className="text-danger"><small>{addBenError.IFSCError}</small></span>
                <button
                  type="submit"
                  className="btn btn-secondary mt-5 w-100"
                  onClick={Register}
                  disabled={(formFlag.fnameError === true && formFlag.mnameError === true && formFlag.lnameError === true && formFlag.CRNError === true && formFlag.accountNoError === true && formFlag.IFSCError === true) ? false : true}
                >
                  Register
                </button>
              </form>
            </div>
          ) : null}
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mx-auto">
          {Transfer ? (
            <form class="p-4 p-md-5 border rounded-3 bg-light mt-5">
              <h3 className="text-center mb-5">NEFT</h3>{" "}
              <div class="form-group-sm mb-3">
                {" "}
                <select value={NEFT.debitAccountNo}
                  className="form-control"
                  onChange={(e) => {
                    setNEFT({ ...NEFT, debitAccountNo: e.target.value });
                  }}
                >
                  <option value="default" selected> debit Account Number</option>
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
                  <option value="default" selected> Credit Account Number</option>
                  {ben.map((item) => {
                    return <option>{item.accountNo}</option>;
                  })}
                </select>
              </div>
              <div class="form-group-sm mb-3">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Amount"
                  onInput={formValidation}
                  name="amount"
                  value={NEFT.amount}

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
                class="w-100 btn  btn-primary mt-3 "
                type="submit"
                onClick={Submit}
                disabled={formError.amountError === "" ? false : true}
              >
                Submit
              </button>
              <hr class="my-4" />
            </form>
          ) : null}
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
      <hr className="bg-secondary" />
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
