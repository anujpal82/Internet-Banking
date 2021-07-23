import { React, useState } from "react";
import "./signUp.scss";
import { Navbar } from "../Navbar";
import ProjectService from "../../Services/LoginService";
import FireBase from "../../Fire-Base/FireBase";
export const SignUp = (props) => {
  const branches = {
    pleaseSelect: ["Select Branch Name"],
    Ahmedabad: ["Vatva I.E.", "Maninagar", "Raneep", "Satelite", "Isanpur"],
    Surat: ["Shree Shakti Tower", "Gaurav Path", "Dhumas Road"],
    Vadodara: [
      "Gotri Road",
      "Manjalpur Road",
      "Raopura Branch",
      "Abhilas Chokdi",
    ],
    Bhavnagar: ["HJ Law College", "Waghwadi Road", "Amba Chowk"],
    Bhuj: ["Adi Road", "Air-Force Station Naliya", "Baladiya Kutch"],
  };
  const [formError, setFormError] = useState({
    fnameError: "",
    mnameError: "",
    lnameError: "",
    emailError: "",
    phoneNoError: "",
    passwordError: "",
    userIdError: "",
    accountNoError: "",
    CIFError: "",
    branchNameError: "",
    IFSCError: "",
    branchCityError: "",
    CRNError: "",
    addressError: "",
  });
  const [formFlag, setFormFlag] = useState({
    fnameFlag: false,
    mnameFlag: false,
    lnameFlag: false,
    emailFlag: false,
    phoneNoFlag: false,
    passwordFlag: false,
    userIdFlag: false,
    accountNoFlag: false,
    CIFFlag: false,
    branchNameFlag: false,
    IFSCFlag: false,
    branchCityFlag: false,
    CRNFlag: false,
    addressFlag: false,
  });


  const formValidation = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "fname":
        var pattern = new RegExp("^[a-zA-Z]+$");
        if (value.length < 3) {
          setFormError({
            ...formError,
            fnameError: "Minimum 3 chracters required",
          });
          setFormFlag({ ...formFlag, fnameFlag: false });
        } else if (!pattern.test(value)) {
          setFormError({
            ...formError,
            fnameError: "The fname can't contain anything other than letter",
          });
          setFormFlag({ ...formFlag, fnameFlag: false });
        } else {
          setFormError({ ...formError, fnameError: null });
          setFormFlag({ ...formFlag, fnameFlag: true });
        }
        break;
      case "mname":
        var pattern = new RegExp("^[a-zA-Z]+$");
        if (value.length < 3) {
          setFormError({
            ...formError,
            mnameError: "Minimum 3 chracters required",
          });
          setFormFlag({ ...formFlag, mnameFlag: false });
        } else if (!pattern.test(value)) {
          setFormError({
            ...formError,
            mnameError: "The mname can't contain anything other than letter",
          });
          setFormFlag({ ...formFlag, mnameFlag: false });
        } else {
          setFormError({ ...formError, mnameError: null });
          setFormFlag({ ...formFlag, mnameFlag: true });
        }
        break;
      case "lname":
        var pattern = new RegExp("^[a-zA-Z]+$");
        if (value.length <= 0) {
          setFormError({
            ...formError,
            lnameError: "lname cnannot be blank",
          });
          setFormFlag({ ...formFlag, lnameFlag: false });
        } else if (!pattern.test(value)) {
          setFormError({
            ...formError,
            lnameError: "The lname can't contain anything other than letter",
          });
          setFormFlag({ ...formFlag, lnameFlag: false });
        } else {
          setFormError({ ...formError, lnameError: null });
          setFormFlag({ ...formFlag, lnameFlag: true });
        }
        break;
      case "CRN":
        var pattern1 = new RegExp("^[0-9]+$", "g");
        if (value.length <= 2) {
          setFormError({ ...formError, CRNError: "minimum 3 digit required" });
          setFormFlag({ ...formFlag, CRNFlag: false });
        } else if (!pattern1.test(value)) {
          setFormError({ ...formError, CRNError: "Only digits are allowed" });
          setFormFlag({ ...formFlag, CRNFlag: false });
        } else {
          setFormError({ ...formError, CRNError: "" });
          setFormFlag({ ...formFlag, CRNFlag: true });
        }
        break;
      case "userId":
        if (value.length <= 5) {
          setFormError({
            ...formError,
            userIdError: "The length of the userid should be at least 6",
          });
          setFormFlag({ ...formFlag, userIdFlag: false });
        } else {
          setFormError({ ...formError, userIdError: "" });
          setFormFlag({ ...formFlag, userIdFlag: true });
        }
        break;

      case "email":
        const regex1 = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
        if (!regex1.test(value)) {
          setFormError({
            ...formError,
            emailError: "Enter valid email-address",
          });
          setFormFlag({ ...formFlag, emailFlag: false });
        } else {
          setFormError({ ...formError, emailError: "" });
          setFormFlag({ ...formFlag, emailFlag: true });
        }
        break;

      case "phoneNo":
        var pattern2 = new RegExp("^[0-9]+$");
        if (value.length !== 10 || !typeof value === "number") {
          setFormError({
            ...formError,
            phoneNoError: "Phone number should be 10 digit only",
          });
          setFormFlag({ ...formFlag, phoneNoFlag: false });
        } else if (!pattern2.test(value)) {
          setFormError({
            ...formError,
            phoneNoError: "Only digits are allowed",
          });
          setFormFlag({ ...formFlag, phoneNoFlag: false });
        } else {
          setFormError({ ...formError, phoneNoError: "" });
          setFormFlag({ ...formFlag, phoneNoFlag: true });
        }
        break;
      case "address":
        if (value.length < 20) {
          setFormError({
            ...formError,
            addressError: "Please type mininum 20 letter for the address",
          });
          setFormFlag({...formFlag,addressFlag:false})
        } else {
          setFormError({ ...formError, addressError: "" });
          setFormFlag({...formFlag,addressFlag:true})
        }
        break;
      case "pass":
        if (value.length < 6) {
          setFormError({
            ...formError,
            passwordError: "Password must be atleast 6 characters",
          });
          setFormFlag({...formFlag,passwordFlag:false})
        } else {
          setFormError({ ...formError, passwordError: "" });
          setFormFlag({...formFlag,passwordFlag:true})
        }
        break;
      case "accountNo":
        var pattern2 = new RegExp("^[0-9]+$");
        if (value.length < 3) {
          setFormError({
            ...formError,
            accountNoError: "Account number should be atleast 3 digit",
          });
          setFormFlag({...formFlag,accountNoFlag:false})
        } else {
          setFormError({ ...formError, accountNoError: "" });
          setFormFlag({...formFlag,accountNoFlag:true})
        }
        break;
      case "CIF":
        if (value.length <= 3) {
          setFormError({ ...formError, CIFError: "Minimum 4 digit required" });
          setFormFlag({...formFlag,CIFFlag:false})
        } else {
          setFormError({ ...formError, CIFError: "" });
          setFormFlag({...formFlag,CIFFlag:true})
        }
        break;
      case "IFSC":
        var pattern4 = new RegExp("^[A-Za-z0-9_-]*$");
        if (value.length <= 3) {
          setFormError({
            ...formError,
            IFSCError: "minimum 4 character required",
          });
          setFormFlag({...formFlag,IFSCFlag:false})
        } else if (!pattern4.test(value)) {
          setFormError({
            ...formError,
            IFSCError: "only digits and letters allowed",
          });
          setFormFlag({...formFlag,IFSCFlag:false})
        } else {
          setFormError({ ...formError, IFSCError: "" });
          setFormFlag({...formFlag,IFSCFlag:true})
        }
        break;
      default:
        break;
    }
  };
  const cities = ["Ahmedabad", "Surat", "Vadodara", "Bhavnagar", "Bhuj"];
  const [signUp, setsignUp] = useState({
    fname: "",
    mname: "",
    lname: "",
    email: "",
    phoneNo: "",
    pass: "",
    userId: "",
    accountNo: "",
    CIF: "",
    branchName: "Select Branch Name",
    IFSC: "",
    branchCity: "pleaseSelect",
    CRN: "",
    address: "",
  });
  const Register = async (e) => {
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
          .then(() => {
            ProjectService.signUp(signUp).then((res1) => {
              console.log(res1.data);
              alert("You Successfully Registered");
            });
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
    setsignUp({
      fname: "",
      mname: "",
      lname: "",
      email: "",
      phoneNo: "",
      pass: "",
      userId: "",
      accountNo: "",
      CIF: "",
      balance: "",
      branchName: "Select Branch Name",
      IFSC: "",
      branchCity: "pleaseSelect",
      CRN: "",
      address: "",
    });
  };
  return (
    <>
      <Navbar />
      <div className="col-md-6 mx-auto mt-5">
        <form className="bg-light p-4 m-4 mt-5" id="signUpForm">
          <h3 className="text-center mb-5 ">Register Form</h3>
          <label className="h4 mb-4 text-center">Basic Details</label>
          <div className="row">
            <div className="col">
              <input
                required
                type="text"
                placeholder="First Name"
                className="form-control"
                name="fname"
                value={signUp.fname}
                onChange={(e) => {
                  setsignUp({ ...signUp, [e.target.name]: e.target.value });
                }}
                onInput={formValidation}
              ></input>
              <span className="text-danger">
                <small>{formError.fnameError}</small>
              </span>
            </div>
            <div className="col">
              {" "}
              <input
                type="text"
                placeholder="Middle Name"
                className="form-control"
                value={signUp.mname}
                onChange={(e) => {
                  setsignUp({ ...signUp, [e.target.name]: e.target.value });
                }}
                onInput={formValidation}
                name="mname"
              ></input>
              <span className="text-danger">
                <small>{formError.mnameError}</small>
              </span>
            </div>
            <div className="col">
              {" "}
              <input
                type="text"
                placeholder="Last Name"
                className="form-control"
                value={signUp.lname}
                onInput={formValidation}
                onChange={(e) => {
                  setsignUp({ ...signUp, [e.target.name]: e.target.value });
                }}
                name="lname"
              ></input>
              <span className="text-danger">
                <small>{formError.lnameError}</small>
              </span>
            </div>
          </div>
          <input
            type="text"
            className="form-control mt-3"
            placeholder="Customer Relationship Number"
            name="CRN"
            value={signUp.CRN}
            onInput={formValidation}
            onChange={(e) => {
              setsignUp({ ...signUp, [e.target.name]: e.target.value });
            }}
          ></input>
          <span className="text-danger">
            <small>{formError.CRNError}</small>
          </span>
          <input
            type="text"
            className="form-control mt-3"
            placeholder="User-Id"
            name="userId"
            onInput={formValidation}
            value={signUp.userId}
            onChange={(e) => {
              setsignUp({ ...signUp, [e.target.name]: e.target.value });
            }}
          ></input>
          <span className="text-danger">
            <small>{formError.userIdError}</small>
          </span>

          <input
            type="email"
            className="form-control mt-3"
            placeholder="E-mail"
            name="email"
            value={signUp.email}
            onInput={formValidation}
            onChange={(e) => {
              setsignUp({ ...signUp, [e.target.name]: e.target.value });
            }}
          />
          <span className="text-danger">
            <small>{formError.emailError}</small>
          </span>

          <input
            type="text"
            className="form-control mt-3"
            placeholder="Phone Number"
            name="phoneNo"
            value={signUp.phoneNo}
            onInput={formValidation}
            pattern="[0-9]+"
            maxLength="10"
            onChange={(e) => {
              setsignUp({ ...signUp, [e.target.name]: e.target.value });
            }}
          ></input>
          <span className="text-danger">
            <small>{formError.phoneNoError}</small>
          </span>

          <textarea
            className="form-control mt-3"
            placeholder="Address"
            name="address"
            value={signUp.address}
            onInput={formValidation}
            onChange={(e) => {
              setsignUp({ ...signUp, [e.target.name]: e.target.value });
            }}
          ></textarea>
          <span className="text-danger">
            <small>{formError.addressError}</small>
          </span>
          <input
            type="password"
            className="form-control mt-3"
            placeholder="Password"
            name="pass"
            onInput={formValidation}
            value={signUp.pass}
            onChange={(e) => {
              setsignUp({ ...signUp, [e.target.name]: e.target.value });
            }}
          />
          <span className="text-danger">
            <small>{formError.passwordError}</small>
          </span>
          <br />

          <label className="h4 mt-4 mb-4 text-center">Account Details</label>
          <input
            type="number"
            className="form-control"
            placeholder="Account Number"
            name="accountNo"
            value={signUp.accountNo}
            onInput={formValidation}
            onChange={(e) => {
              setsignUp({ ...signUp, [e.target.name]: e.target.value });
            }}
          ></input>
          <span className="text-danger">
            <small>{formError.accountNoError}</small>
          </span>
          <div className="row mt-3">
            <div className="col">
              <input
                type="number"
                className="form-control"
                placeholder="CIF"
                name="CIF"
                value={signUp.CIF}
                onInput={formValidation}
                onChange={(e) => {
                  setsignUp({ ...signUp, [e.target.name]: e.target.value });
                }}
              ></input>
              <span className="text-danger">
                <small>{formError.CIFError}</small>
              </span>
            </div>
          </div>
          <label className="h4 mt-4 mb-4 text-center">Branch Details</label>
          <select
            type="text"
            placeholder="Branch City"
            className="form-control mt-3 mb-3"
            name="branchCity"
            value={signUp.branchCity}
            onChange={(e) => {
              setsignUp({ ...signUp, [e.target.name]: e.target.value });
            }}
          >
            <option selected value="pleaseSelect">
              Select City
            </option>
            {cities.map((item) => {
              return <option>{item}</option>;
            })}
          </select>

          <select
            type="text"
            placeholder="Branch Name"
            className="form-control"
            name="branchName"
            value={signUp.branchName}
            onChange={(e) => {
              setsignUp({ ...signUp, [e.target.name]: e.target.value });
            }}
          >
            {branches[signUp.branchCity].map((item) => {
              return <option>{item}</option>;
            })}
          </select>
          <input
            type="number"
            placeholder="IFSC Code"
            className="form-control mt-3"
            name="IFSC"
            onInput={formValidation}
            value={signUp.IFSC}
            onChange={(e) => {
              setsignUp({ ...signUp, [e.target.name]: e.target.value });
            }}
          ></input>
          <span className="text-danger">
            <small>{formError.IFSCError}</small>
          </span>

          <div
            className="mt-3"
            id="recaptcha-container"
            data-size="compact"
            style={{ width: "400px" }}
          ></div>

          <button
            disabled={
              formFlag.fnameFlag === true &&
              formFlag.mnameFlag === true &&
              formFlag.lnameFlag === true &&
              formFlag.userIdFlag === true &&
              formFlag.emailFlag === true &&
              formFlag.phoneNoFlag === true &&
              formFlag.addressFlag === true &&
              formFlag.passwordFlag === true &&
              formFlag.accountNoFlag === true &&
              formFlag.CIFFlag === true &&
              formFlag.IFSCFlag === true
                ? false
                : true
            }
            type="submit"
            className="btn btn-primary mt-4 w-100"
            onClick={Register}
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
};
