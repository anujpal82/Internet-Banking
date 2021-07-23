import { React, useState, useEffect } from "react";
import ProjectService from "../../Services/LoginService";
import { MdAccountBalanceWallet } from "react-icons/md";
import { AiOutlineCopyright } from "react-icons/ai";
import { FaRupeeSign } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import Logo from "../../components/Images/bank.jpg";
import "./home.scss";
import { Carousel } from "react-bootstrap";
import image1 from "../../../src/components/Images/24.jpg";
import image2 from "../../../src/components/Images/25.jpg";
import image3 from "../../../src/components/Images/26.jpg";

import { Navbar } from "../../components/Portal/Navbar";

export const Home = (props) => {
  var todayDate = new Date();
  var lastUpdateddate = `${todayDate.getDate()}/${todayDate.getMonth() + 1
    }/${todayDate.getFullYear()}`;
  // const [state, setstate] = useState(false);
  const [MiniStatement, setMiniStatement] = useState({
    startingDate: "",
    endingDate: "",
    accountNo: props.match.params.id,
  });
  const [customer, setCustomer] = useState({});
  const [statement, setStatement] = useState([]);
  const [showTranjaction, setShowTranjaction] = useState(false);
  useEffect(() => {
    ProjectService.getCustomer(props.match.params.id).then((res) => {
      setCustomer(res.data[0]);
    });
  }, [props.match.params.id]);

  const LogOut = (e) => {
    localStorage.clear();
    props.history.push("/");
  };
  const Find = (e) => {
    e.preventDefault();
    console.log(MiniStatement);
    ProjectService.MiniStatementById(MiniStatement).then((res) => {
      setStatement(res.data);
    });
    setShowTranjaction(!showTranjaction);
  };
  return (
    <>
      <Navbar id={props.match.params.id} />
      <div className="container">
        <div className="row ">
          <div className="col mt-2">
            <h3 className="text-center ">
              Mr {customer.fname} {customer.mname} {customer.lname}
            </h3>
          </div>
          <div className="col   ">
            <small className="h2">
              <MdAccountBalanceWallet />
            </small>{" "}
            <small className="ml-2 h4">{customer.balance}</small>{" "}
            <small className="h4 pull-right">
              <FaRupeeSign />
            </small>
            <div className="me-5" style={{ float: "right" }}>
              <small className="mr-2 h2" onClick={LogOut}>
                {" "}
                <FiLogOut id="logout" />
              </small>
              <br></br>
              <small className="h6 ">Logout</small>
            </div>
          </div>
        </div>
        <marquee
          scrollamount="10"
          className="text-danger mt-3 "
          style={{ fontWeight: "bold" }}
        >
          Our Bank Never Ask For Confidencial Information Such As PIN and OTP
          from customers.Only any such call can be made by only
          fraudsters.Please do not share personal Information{" "}
        </marquee>
        <div className="row mt-3">
          <div
            className="col-md-10 m-4 col-lg-5 mb-3 rounded-corner"
            id="statement"
          >
            <form className="bg-light p-4 m-4 mt-5" id="addBenficiaryForm">
              <h3 className="text-center mb-5">Statements</h3>
              <label className="h6">Enter Starting Date</label>
              <input
                type="date"
                className="form-control mt-2"
                name="startingDate"
                onChange={(e) => {
                  setMiniStatement({
                    ...MiniStatement,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
              <div className="mt-3">
                <label className="h6">Enter Ending Date</label>
                <input
                  type="date"
                  className="form-control mt-2"
                  name="endingDate"
                  onChange={(e) => {
                    setMiniStatement({
                      ...MiniStatement,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </div>
              <button
                type="button"
                className="mt-3 btn w-100 btn-primary"
                onClick={Find}
              >
                Find
              </button>
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
        <div className="row mt-3 m-1">
          <div className="col-lg-8 mx-auto ">
            {showTranjaction ? (
              <div>
                <h3 className="text-center ">Recent 10 Tranjaction</h3>
                <table className="table bg-ligt mt-4  text-center">
                  <tr>
                    <td
                      className="h6 border border-success"
                      style={{ color: "#064420" }}
                    >
                      Debit Account
                    </td>
                    <td
                      className="h6 border border-success"
                      style={{ color: "#064420" }}
                    >
                      Name
                    </td>
                    <td
                      className="h6 border border-success"
                      style={{ color: "#064420" }}
                    >
                      Credit Account
                    </td>
                    <td
                      className="h6 border border-success"
                      style={{ color: "#064420" }}
                    >
                      Name
                    </td>
                    <td
                      className="h6 border border-success"
                      style={{ color: "#064420" }}
                    >
                      Date
                    </td>
                    <td
                      className="h6 border border-success"
                      style={{ color: "#064420" }}
                    >
                      Amount

                    </td>
                    <td
                      className="h6 border border-success"
                      style={{ color: "#064420" }}
                    >
                      Type
                    </td>
                  </tr>

                  <tbody>
                    {statement.map((item) => {
                      let tempDate = new Date(item.date);
                      let month = tempDate.getMonth() + 1;
                      let year = tempDate.getFullYear();
                      let day = tempDate.getDate();
                      let date = `${day}/${month}/${year}`;
                      return (
                        <tr>
                          <td className="border border-success">
                            {item.debitAccountNo}
                          </td>
                          <td className="border border-success">
                            {item.dname}
                          </td>
                          <td className="border border-success">
                            {item.creditAccountNo}
                          </td>
                          <td className="border border-success">
                            {item.cname}
                          </td>
                          <td className="border border-success">{date}</td>
                          <td className="border border-success">
                            {item.amount}      <span>< FaRupeeSign /></span>
                          </td>
                          <td className="border border-success">{item.type}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
        </div>
        <div className="row">
          <div class=" col-lg-11 m-4 card card border-0 mx-auto">
            <Carousel interval={3000}>
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
      </div>
      <article
        className="row  mt-4 "
        style={{ backgroundColor: "#CDF0EA", color: "black" }}
      >
        <div classname="w-100 col-md-12">

          <div className="row m-4">
            <div className="col">
              <ul className="list-unstyled">
                <h5>Home</h5>
                <li className="mt-3">Forex And Rates</li>
                <li>Careers</li>
                <li>Intrest Rates</li>
                <li>Download Forms</li>
                <li>Corporate Social</li>
                <li>Resposibility</li>
                <li>Sustainability and Business</li>
                <li>Responsibility Policy</li>
                <li>Bank Calender</li>
              </ul>
            </div>
            <div className="col">
              <ul className="list-unstyled">
                <h5>NRI</h5>
                <li className="mt-3">Accounts</li>
                <li>Investments</li>
                <li>Loans</li>
                <li>Download Forms</li>
                <li>Corporate Social</li>
                <li>Informations</li>
              </ul>
            </div>
            <div className="col">
              <ul className="list-unstyled">
                <h5>Personal</h5>
                <li className="mt-3">Saving Accounts</li>
                <li>Investments And Deposits</li>
                <li>Loans</li>
                <li>Cards</li>
                <li>Digital</li>
                <li>Informations And Services</li>
              </ul>
            </div>
            <div className="col">
              <ul className="list-unstyled">
                <h5>International Bankings</h5>
                <li className="mt-3">Banking</li>
                <li>Credit Finance</li>
                <li>Services</li>
              </ul>
            </div>
            <div className="col">
              <ul className="list-unstyled">
                <h5>CAG And MCG</h5>
                <li className="mt-3">Current Account</li>
                <li>SME Deposits</li>
                <li>SME Loans</li>
                <li>Information</li>
              </ul>
            </div>
            <div className="col">
              <ul className="list-unstyled">
                <h5>Wealth Management</h5>
                <li className="mt-3">SBI Wealth</li>
                <li>Products</li>
              </ul>
            </div>
          </div>
        </div>
      </article>
      <article className="container mb-5  ">
        <div className="row " >
          <div className="col">
            <small className="ml-3">Last Updated On :</small>
            <small className="ml-2 ">{lastUpdateddate}</small>
            <small className="ml-3 ">|</small>
            <small className="ml-3 ">Visitors : 27591024</small>
          </div>

          <div className="col"  >
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