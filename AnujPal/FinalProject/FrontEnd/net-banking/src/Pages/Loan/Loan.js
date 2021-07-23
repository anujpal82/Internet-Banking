import { React, useState } from "react";
import { AiOutlineCopyright } from "react-icons/ai";
import { Navbar } from "../../components/Portal/Navbar";
import { useEffect } from "react";
import { MdAccountBalanceWallet } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import schedule from "node-schedule";
import FireBase from "../../Fire-Base/FireBase";

import ProjectService from "../../Services/LoginService";

export const Loan = (props) => {
  var todayDate = new Date();
  var lastUpdateddate = `${todayDate.getDate()}/${todayDate.getMonth() + 1
    }/${todayDate.getFullYear()}`;
  const [Loan, setLoan] = useState({
    CRN: "",
    accountNo: "",
    amount: "",
    duration: "",
  });
  const [emi, setEmi] = useState(0);
  const [monthRemaining, setMonthRemaining] = useState(0);
  const [CRN, setCRN] = useState([]);
  const [formError, setFormError] = useState({ CRNError: "", amountError: "" })
  const [formFlag, setFormFlag] = useState({ CRNFlag: false, amountFlag: false })
  const [customer, setCustomer] = useState({});
  useEffect(() => {
    ProjectService.getCustomer(props.match.params.id).then((res) => {
      setCustomer(res.data[0]);
    });
    ProjectService.getCustomerByCRN({ CRN: Loan.CRN }).then((res) => {
      setCRN(res.data);
    });
  }, [Loan.CRN, props.match.params.id]);
  const LogOut = (e) => {
    localStorage.clear();
    props.history.push("/");
  };
  const formValidation = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "CRN":
        var pattern1 = new RegExp("^[0-9]+$", "g");
        if (value.length <= 2) {
          setFormError({ ...formError, CRNError: "minimum 3 digit required" });
          setFormFlag({ ...formFlag, CRNFlag: false })
        } else if (!pattern1.test(value)) {
          setFormError({ ...formError, CRNError: "Only digits are allowed" });

          setFormFlag({ ...formFlag, CRNFlag: false });
        } else {
          setFormError({ ...formError, CRNError: "" });
          setFormFlag({ ...formFlag, CRNFlag: true })
        }
        break;
      case "amount":
        if (value < 10000) {
          setFormError({
            ...formError,
            amountError: "amount cannot be less than 10000",
          });
          setFormFlag({ ...formFlag, amountFlag: false })
        } else {
          setFormError({ ...formError, amountError: "" });
          setFormFlag({ ...formFlag, amountFlag: true })
        }

        break;
      default:
        break;
    }
  }
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
            ProjectService.loanApprove({
              CRN: Loan.CRN,
              accountNo: Loan.accountNo,
              duration: Loan.duration,
              amount: Loan.amount,
              EMI: emi,
              monthRemaining: monthRemaining,
            }).then((res) => {
              console.log(res.data);
            });
            ProjectService.loanNEFT({
              accountNo: Loan.accountNo,
              amount: Loan.amount,
            }).then((res) => {
              console.log(res.data);
              alert("Your loan is passed")
              setLoan({
                CRN: "",
                accountNo: "",
                amount: "",
                duration: "default",
              })
            });
          })
          .catch((err) => {
           alert(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const claculateEMI = async (e) => {
    e.preventDefault();
    let option = Loan.duration;
    let amount = parseInt(Loan.amount);
    let intrest = 16;
    switch (option) {
      case "1 year":
        for (let index = 0; index < 1; index++) {
          amount += parseInt((amount * intrest) / 100);
        }
        let EMI = parseInt(amount / 12);
        setEmi(EMI);

        setMonthRemaining(12);
        alert(`EMI For 1 Year Is :  ` + EMI);
        break;
      case "2 year":
        for (let index = 0; index < 2; index++) {
          amount += parseInt((amount * intrest) / 100);
        }
        let EMI1 = parseInt(amount / 24);
        await setEmi(EMI1);
        setMonthRemaining(24);
        alert(`EMI For 2 Year Is :  ` + EMI1);
        break;
      case "3 year":
        for (let index = 0; index < 3; index++) {
          amount += parseInt((amount * intrest) / 100);
        }
        let EMI2 = parseInt(amount / 36);
        setEmi(EMI2);
        setMonthRemaining(36);
        alert(`EMI For 3 Year Is :  ` + EMI2);
        break;
      case "4 year":
        for (let index = 0; index < 4; index++) {
          amount += parseInt((amount * intrest) / 100);
        }

        let EMI3 = parseInt(amount / 48);
        setEmi(EMI3);
        setMonthRemaining(48);
        alert(`EMI For 4 Year Is :  ` + EMI3);
        break;

      default:
        break;
    }
  };

  schedule.scheduleJob("m-job", "0 0 1 * *", async () => {
    await ProjectService.EMI().then((res) => {
      console.log(res.data);
    });
  });
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
        <marquee
          scrollamount="10"
          className="text-danger mt-3 "
          style={{ fontWeight: "bold" }}
        >
          Presently our bank's interest for personal loan is 16%
        </marquee>
        <div className="col-md-6 mx-auto mt-5">
          <form className="bg-light p-4 m-4 mt-5" id="signUpForm">
            <h3 className="text-center mb-5 ">Instant Loan</h3>
            <input
              type="text"
              className="form-control"
              value={Loan.CRN}
              onInput={formValidation}
              name="CRN"
              placeholder="Customer Relationship Number"
              onChange={(e) => {
                setLoan({ ...Loan, [e.target.name]: e.target.value });
              }}
            />
            <span className="text-danger"><small>{formError.CRNError}</small></span>

            <select value={Loan.accountNo}
              className="form-control mt-3 "
              name="accountNo"
              onChange={(e) => {
                setLoan({ ...Loan, [e.target.name]: e.target.value });
              }}
            >
              <option value="default" selected>Select Account Number</option>
              {CRN.map((item, key) => {
                return <option key={item.accountNo}>{item.accountNo}</option>;
              })}
            </select>
            <input
              type="text"
              className="form-control mt-3"
              name="amount"
              placeholder="Amount"
              value={Loan.amount}
              onInput={formValidation}
              onChange={(e) => {
                setLoan({ ...Loan, [e.target.name]: e.target.value });
              }}
            />
            <span className="text-danger"><small>{formError.amountError}</small></span>
            <div className="row ">
              <div className="col">
                {" "}
                <select value={Loan.duration}
                  className="form-control mt-3 "
                  name="duration"
                  value={Loan.duration}
                  onChange={(e) => {
                    setLoan({ ...Loan, [e.target.name]: e.target.value });
                  }}
                >
                  <option value="default" selected>Select Duration </option>
                  <option>1 year </option>
                  <option>2 year </option>
                  <option>3 year </option>
                  <option>4 year </option>
                </select>
              </div>
              <div className="col">
                <button
                  className="btn btn-success w-100 mt-3"
                  onClick={claculateEMI}
                >
                  Calculate EMI
                </button>
              </div>
            </div>
            <div id="recaptcha-container" className="mt-4"></div>
            <button
              type="button"
              className="btn btn-primary w-100 mt-5"
              disabled={formFlag.CRNFlag === true && formFlag.amountFlag === true ? false : true}
              onClick={Apply}
            >
              Apply
            </button>
          </form>
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
