import React from "react";

export const addBeneficiary = () => {
  return (
    <div className="col-md-6 mx-auto mt-5">
      <form className="bg-light p-4 m-4 mt-5" id="signUpForm">
        <h3 className="text-center mb-5 ">Beneficiary Register Form</h3>
        <div className="row">
          <div className="col">
            <input
              type="text"
              placeholder="First Name"
              className="form-control"
              name="fname"
              // onChange={(e) => {
              //   setsignUp({ ...signUp, [e.target.name]: e.target.value });
              // }}
            ></input>
          </div>
          <div className="col">
            {" "}
            <input
              type="text"
              placeholder="Middle Name"
              className="form-control"
              // onChange={(e) => {
              //   setsignUp({ ...signUp, [e.target.name]: e.target.value });
              // }}
              name="mname"
            ></input>
          </div>
          <div className="col">
            {" "}
            <input
              type="text"
              placeholder="Last Name"
              className="form-control"
              // onChange={(e) => {
              //   setsignUp({ ...signUp, [e.target.name]: e.target.value });
              // }}
              name="lname"
            ></input>
          </div>
        </div>
        <input
            type="text"
            className="form-control mt-3"
            placeholder="Customer Relationship Number"
            name="CRN"
            // onChange={(e) => {
            //   setsignUp({ ...signUp, [e.target.name]: e.target.value });
            // }}
          ></input>
        <input
            type="text"
            className="form-control mt-3"
            placeholder="Account Number"
            name="accountNo"
            // onChange={(e) => {
            //   setsignUp({ ...signUp, [e.target.name]: e.target.value });
            // }}
          ></input>
        <input
            type="text"
            className="form-control mt-3"
            placeholder="Re-Enter Account Number"
            name="accountNo1"
            // onChange={(e) => {
            //   setsignUp({ ...signUp, [e.target.name]: e.target.value });
            // }}
          ></input>
        <input
            type="text"
            className="form-control mt-3"
            placeholder="IFSC Code"
            name="IFSC"
            // onChange={(e) => {
            //   setsignUp({ ...signUp, [e.target.name]: e.target.value });
            // }}
          ></input>
            <button
            type="submit"
            className="btn btn-secondary mt-5 w-100"
            // onClick={Register}
          >
            Register
          </button>
      </form>
    </div>
  );
};
