import React, { useEffect, useState } from "react";
import { AiOutlineCopyright } from "react-icons/ai";
import { Navbar } from "../components/Portal/Navbar";
import ProjectService from "../Services/LoginService";
import FireBase from "../Fire-Base/FireBase";

export const ApplyForCheque = (props) => {
  var todayDate = new Date();
  var lastUpdateddate = `${todayDate.getDate()}/${
    todayDate.getMonth() + 1
  }/${todayDate.getFullYear()}`;
  const [customer, setustomer] = useState({});
  useEffect(() => {
    ProjectService.getCustomer(props.match.params.id).then((res) => {
      setustomer(res.data[0]);
    });
  }, [props.match.params.id]);
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
            let name = `${customer.fname} ${customer.mname} ${customer.lname}`;
            ProjectService.checkBookRequest({
              accountNo: customer.accountNo,
              name: name,
              address: customer.address,
              CIF: customer.CIF,
              branchName: customer.branchName,
            }).then((res) => {
              console.log(res.data);
              alert(
                "Your Request Of CheckBook Will Be Approved Sortly"
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
      <div className="col-md-6 mx-auto mt-5">
        <form className="bg-light p-4 m-4 mt-5" id="signUpForm">
          <h3 className="text-center mb-5 ">Apply For ChequeBook</h3>
          <div className="mt-3">
            {" "}
            <small className="fs-small text-success ">
              Account Number Printed On ChequeBook
            </small>
          </div>
          <input
            type="text"
            placeholder="Accout No"
            className="form-control"
            value={customer.accountNo}
          />
          <div className="mt-3">
            {" "}
            <small className="fs-small text-success ">
              Name Printed On ChequeBook
            </small>
          </div>

          <input
            type="text"
            placeholder="Accout No"
            className="form-control "
            value={`${customer.fname} ${customer.mname} ${customer.lname}`}
          />
          <div className="mt-3">
            {" "}
            <small className="fs-small text-success ">Delivery Address</small>
          </div>
          <textarea
            type="text"
            placeholder="Address"
            className="form-control  "
            value={customer.address}
          />
          <div className="mt-3">
            {" "}
            <small className="fs-small text-success ">CIF</small>
          </div>
          <input
            type="text"
            placeholder="CIF"
            className="form-control  "
            value={customer.CIF}
          />
          <div className="mt-3">
            {" "}
            <small className="fs-small text-success ">Branch Code</small>
          </div>
          <input
            type="text"
            placeholder="Branch Name"
            className="form-control  "
            value={customer.branchName}
          />
          <div
            id="recaptcha-container"
            data-size="compact"
            style={{ width: "400px" }}
          ></div>
          <button className="btn btn-secondary w-100 mt-4" onClick={Apply}>
            Apply
          </button>
        </form>
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
