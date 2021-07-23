import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Portal/Navbar";
import ProjectService from "../Services/LoginService";
import FireBase from '../Fire-Base/FireBase'
import { AiOutlineCopyright } from "react-icons/ai";

export const ApplyForFD = (props) => {
  var todayDate = new Date()
  var lastUpdateddate = `${todayDate.getDate()}/${todayDate.getMonth() + 1}/${todayDate.getFullYear()}`
  const [customer, setCustomer] = useState({});
  const [formError, setFormError] = useState({ amountError: "" })
  const [formFlag, setFormFlag] = useState({ amountFlag: false })
  const [FD, setFD] = useState({ amount: "", duration: "" });
  useEffect(() => {
    ProjectService.getCustomer(props.match.params.id).then((res) => {
      setCustomer(res.data[0]);
    });
  }, [props.match.params.id]);
  const Apply = async (e) => {
    e.preventDefault()
    let recaptcha = new FireBase.auth.RecaptchaVerifier("recaptcha-container");
    let number = "+918128501852";
    await FireBase.auth()
      .signInWithPhoneNumber(number, recaptcha)
      .then((res) => {
        let code = prompt("enter otp", "");
        if (code == null) return;
        res
          .confirm(code)
          .then(() => {
            ProjectService.FDNEFT({
              debitAccountNo: props.match.params.id,
              creditAccountNo: 110,
              amount: FD.amount,
            }).then((res) => {
              alert("Successfuly applied for fixed-deposit")
              console.log(res.data);
              setFD({
                amount:"",
                duration:"default"
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
  const formValidation = (e) => {
    const { name, value } = e.target
    switch (name) {
      case 'amount':
        if (value < 10000) {
          setFormError({ ...formError, amountError: "amount cannot be less than 10000" })
          setFormFlag({ ...formFlag, amountFlag: false })
        }
        else {
          setFormError({ ...formError, amountError: "" })
          setFormFlag({ ...formFlag, amountFlag: true })
        }
        break;

      default:
        break;
    }
  }
  const calculateMoney = (e) => {
    e.preventDefault();
    let intrest = 6;
    let money = parseInt(FD.amount);
    let key = FD.duration;
    switch (key) {
      case "1 year":
        for (let index = 0; index < 1; index++) {
          money += parseInt((money * intrest) / 100);
        }
        alert(` After ${FD.duration} You Will be Get ${money} Rs`);
        break;
      case "3 year":
        for (let index = 0; index < 3; index++) {
          money += parseInt((money * intrest) / 100);
        }
        alert(` After ${FD.duration} You Will be Get ${money} Rs`);
        break;
      case "5 year":
        for (let index = 0; index < 5; index++) {
          money += parseInt((money * intrest) / 100);
        }
        alert(` After ${FD.duration} You Will be Get ${money} Rs`);
        break;
      case "10 year":
        for (let index = 0; index < 10; index++) {
          money += parseInt((money * intrest) / 100);
        }
        alert(` After ${FD.duration} You Will be Get ${money} Rs`);
        break;

      default:
        break;
    }

  };
  return (
    <>
      <Navbar id={props.match.params.id} />
      <div className="col-md-6 mx-auto mt-5">
        <form className="bg-light p-4 m-4 mt-5" id="signUpForm">
          <h3 className="text-center mb-5 ">Apply For Fixed Deposit</h3>
          <div className="mt-3 text-success mb-1 p-1 "> CRN</div>
          <input
            type="text"
            placeholder="CRN"
            value={customer.CRN}
            className="form-control"
            disabled="true"
          />
          <div className="mt-3 text-success mb-1 p-1 "> Account Number</div>
          <input
            type="text"
            placeholder="CRN"
            value={customer.accountNo}
            className="form-control"
            disabled="true"
          />
          <div className="mt-3 text-success mb-1 p-1 "> Amount</div>
          <input
            type="text"
            placeholder="Amount"
            name="amount"
            value={FD.amount}
        
            onChange={(e) => {
              setFD({ ...FD, [e.target.name]: e.target.value });
            }}
            onInput={formValidation}
            className="form-control"
          />
          <span className="text-danger"><small>{formError.amountError}</small></span>
          <div className="mt-3 text-success mb-1 p-1 ">Duration</div>
          <div className="row">
            <div className="col">
              {" "}
              <select
                className="form-control"
                value={FD.amount}
                onChange={(e) => {
                  setFD({ ...FD, [e.target.name]: e.target.value });
                }}
                name="duration"
              >
                <option value="default" selected>please select</option>
                <option>1 year</option>
                <option>3 year</option>
                <option>5 year</option>
                <option>10 year</option>
              </select>
            </div>
            <div className="col">
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={calculateMoney}
              >
                Calculate Money
              </button>
            </div>
          </div>
          <div className="mt-4" id="recaptcha-container"></div>
          <div className="mt-5 ">
            <button className="btn btn-secondary w-100 " onClick={Apply} disabled={formFlag.amountFlag === true ? false : true}>
              Apply
            </button>
          </div>

        </form>
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
