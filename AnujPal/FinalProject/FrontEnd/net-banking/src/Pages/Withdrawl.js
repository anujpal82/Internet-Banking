import { React, useState, useEffect } from "react";
import ProjectService from "../Services/LoginService";
import { Navbar } from "../components/Portal/Navbar";
import { MdAccountBalanceWallet } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import FireBase from "../Fire-Base/FireBase";
import Logo from "../components/Images/bank.jpg";

export const Withdrawl = (props) => {
  const [customer, setCustomer] = useState({});
  const [state, setstate] = useState(false);
  const [debit, setDebit] = useState({ accountNo: "", amount: "" });
  
  useEffect(() => {
    ProjectService.getCustomer(props.match.params.id).then((res) => {
      setCustomer(res.data[0]);
    });
    setstate(false);
    setDebit({ accountNo: "", amount: "" });
  }, [state,props.match.params.id]);
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
            ProjectService.debit(debit)
              .then((res1) => {
                console.log(res1.data);
                setstate(true);
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log("Error during res.confirm(code");
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <>
      <Navbar id={props.match.params.id} />
      <div className="container">
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
        <div className="row mt-5">
          <div className="col-md-10 m-4 col-lg-5">
            <form class="p-4 p-md-5 border rounded-3 bg-light">
              <h3 className="text-center mb-5">Withdrawl</h3>
              <div class="form-floating mb-3">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Account Number"
                  onChange={(e) => {
                    setDebit({ ...debit, [e.target.name]: e.target.value });
                  }}
                  name="accountNo"
                  value={debit.accountNo}
                />
              </div>
              <div class="form-floating mb-3">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Amount"
                  name="amount"
                  value={debit.amount}
                  onChange={(e) => {
                    setDebit({ ...debit, [e.target.name]: e.target.value });
                  }}
                />
              </div>
              <div id="recaptcha-container"></div>

              <button
                class="w-100 btn btn-lg btn-primary mt-3 "
                type="submit"
                onClick={Submit}
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
    </>
  );
};
