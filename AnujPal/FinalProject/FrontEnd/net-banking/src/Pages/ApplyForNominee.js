import { React, useEffect, useState } from "react";
import { Navbar } from "../components/Portal/Navbar";
import ProjectService from "../Services/LoginService";
import FireBase from "../Fire-Base/FireBase";
import { AiOutlineCopyright } from "react-icons/ai";

export const ApplyForNominee = (props) => {
  var todayDate = new Date();
  var lastUpdateddate = `${todayDate.getDate()}/${todayDate.getMonth() + 1
    }/${todayDate.getFullYear()}`;
  const [customer, setCustomer] = useState({});
  const [CRN, setCRN] = useState([]);
  const [formError, setFormError] = useState({
    accountNoError: "",
    nameError: "",
    DOBError: "",
    relationError: "",
    equityError: "",
  });
  const [formFlag, setFormFlag] = useState({
    accountNoFlag: "",
    nameFlag: "",
    DOBFlag: "",
    relationFlag: "",
    equityFlag: "",
  });
  const [nominee, setNominee] = useState({
    accountNo: "a1",
    name: "",
    equity: "default",
    relation: "default",
    DOB: "",
  });
  useEffect(() => {
    ProjectService.getCustomer(props.match.params.id).then((res) => {
      setCustomer(res.data[0]);
    });
    ProjectService.getCustomerByCRN({ CRN: customer.CRN }).then(
      async (res1) => {
        setCRN(res1.data);
      }
    );
  }, [props.match.params.id, customer.CRN]);
  const Apply = async (e) => {
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
            ProjectService.addNominee(nominee)
              .then(async (res) => {
                console.log(res.data);
                alert("succesfully nominee added")
                document.getElementById("signUpForm").reset();
                setNominee({ accountNo: "", name: "", DOB: "", relation: "", equity: "default" })

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
  
   
  };
  const formValidation = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "accountNo":
        if (value === "default") {
          setFormError({
            ...formError,
            accountNoError: "please select from the above dropdown",
          });
          setFormFlag({ ...formFlag, accountNoFlag: false });
        } else {
          setFormError({ ...formError, accountNoError: "" });
          setFormFlag({ ...formFlag, accountNoFlag: true });
        }

        break;
      case "name":
        if (value.length < 3) {
          setFormError({
            ...formError,
            nameError: "name should have atleast 3 characters",
          });
          setFormFlag({ ...formFlag, nameFlag: false });
        } else {
          setFormError({ ...formError, nameError: "" });
          setFormFlag({ ...formFlag, nameFlag: true });
        }
        break;
      case "DOB":
        if (value === "") {
          setFormError({
            ...formError,
            DOBError: "please select date of birth",
          });
          setFormFlag({ ...formFlag, DOBFlag: false });
        } else {
          setFormError({ ...formError, DOBError: "" });
          setFormFlag({ ...formFlag, DOBFlag: true });
        }
        break;
      case "relation":
        if (value === "default") {
          setFormError({
            ...formError,
            relationError: "please select relation from above dropdown",
          });
          setFormFlag({ ...formFlag, relationFlag: false });
        } else {
          setFormError({ ...formError, relationError: "" });
          setFormFlag({ ...formFlag, relationFlag: true });
        }
        break;
      case "equity":
        if (value === "default") {
          setFormError({ ...formError, equityError: "please select equity  " });
          setFormFlag({ ...formFlag, equityFlag: false });
        } else {
          setFormError({ ...formError, equityError: "" });
          setFormFlag({ ...formFlag, equityFlag: true });
        }
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
          <h3 className="text-center mb-5 ">Apply For Nominee</h3>

          <div className="mt-3 text-success mb-1 p-1 "> Account Number</div>
          <select
            type="text"
            placeholder="Account Number"
            className="form-control"
            name="accountNo"
            onInput={formValidation}
            onChange={(e) => {
              setNominee({ ...nominee, [e.target.name]: e.target.value });
            }}
          >
            <option value="a1">Select Account Number</option>
            {CRN.map((item) => {
              return <option>{item.accountNo}</option>;
            })}
          </select>
          <span className="text-danger">
            <small>{formError.accountNoError}</small>
          </span>
          <div className="mt-3 text-success mb-1 p-1 "> Name</div>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={nominee.name}
            onInput={formValidation}
            onChange={(e) => {
              setNominee({ ...nominee, [e.target.name]: e.target.value });
            }}
            className="form-control"
          />
          <span className="text-danger">
            <small>{formError.nameError}</small>
          </span>
          <div className="mt-3 text-success mb-1 p-1 "> Date Of Birth</div>
          <input
            type="date"
            placeholder="Date Of Birth"
            name="DOB"
            value={nominee.DOB}
            onInput={formValidation}
            onChange={(e) => {
              setNominee({ ...nominee, [e.target.name]: e.target.value });
            }}
            className="form-control"
          />
          <span className="text-danger">
            <small>{formError.DOBError}</small>
          </span>
          <div className="mt-3 text-success mb-1 p-1 "> Relation</div>
          <select

            className="form-control"
            onChange={(e) => {
              setNominee({ ...nominee, [e.target.name]: e.target.value });
            }}
            onInput={formValidation}
            name="relation"
          >
            <option value="default">Select Relation with Account Holder</option>
            <option>Mother</option>
            <option>Father</option>
            <option>Wife</option>
            <option>Spouse</option>
            <option>Brother</option>
            <option>Sister</option>
          </select>
          <span className="text-danger">
            <small>{formError.relationError}</small>
          </span>
          <div className="mt-3 text-success mb-1 p-1 "> Equity</div>
          <select
            // value={nominee.equity}
            className="form-control"
            onInput={formValidation}
            onChange={(e) => {
              setNominee({ ...nominee, equity: e.target.value });
            }}
            name="equity"
          >
            <option value="default" selected>% of Equity Want to Give</option>
            <option>25%</option>
            <option>50%</option>
            <option>75%</option>
            <option>100%</option>
          </select>
          <span className="text-danger">
            <small>{formError.equityError}</small>
          </span>

          <div className="mt-4" id="recaptcha-container"></div>
          <div className="mt-3">
            <button
              className="btn btn-secondary w-100 "
              disabled={
                formFlag.accountNoFlag === true &&
                  formFlag.nameFlag === true &&
                  formFlag.DOBFlag === true &&
                  formFlag.relationFlag === true &&
                  formFlag.equityFlag === true
                  ? false
                  : true
              }
              onClick={Apply}
            >
              Apply
            </button>
          </div>
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
