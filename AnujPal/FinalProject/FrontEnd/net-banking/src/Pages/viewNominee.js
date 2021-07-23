import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Portal/Navbar";
import ProjectService from "../Services/LoginService";
import { AiOutlineCopyright } from "react-icons/ai";

export const ViewNominee = (props) => {
  var todayDate = new Date();
  var lastUpdateddate = `${todayDate.getDate()}/${
    todayDate.getMonth() + 1
  }/${todayDate.getFullYear()}`;
  const [customer, setCustomer] = useState({});
  const [CRN, setCRN] = useState([]);
  const [accountNo, setAccountNo] = useState({ accountNo: "" });
  const [nomineeDetails, setNomineeDetails] = useState([]);
  useEffect(() => {
    ProjectService.getCustomer(props.match.params.id).then((res) => {
      setCustomer(res.data[0]);
    });
    ProjectService.getCustomerByCRN({ CRN: customer.CRN }).then(
      async (res1) => {
        setCRN(res1.data);
      }
    );
  }, [customer.CRN, props.match.params.id, nomineeDetails]);
  const Submit = (e) => {
    e.preventDefault();
    ProjectService.viewNominee(accountNo).then((res) => {
      setNomineeDetails(res.data);
    });
  };
  const Remove = (id) => {
    ProjectService.deleteNominee({ _id: id }).then((res) => {
      console.log(res.data);
    });
  };
  return (
    <>
      <Navbar id={props.match.params.id} />
      <div className="col-md-6 mx-auto mt-5">
        <form className="bg-light p-4 m-4 mt-5" id="signUpForm">
          <h3 className="text-center mb-5 ">View Nominees</h3>
          <select
            name="accountNo"
            className="form-control"
            onChange={(e) => {
              setAccountNo({ ...accountNo, [e.target.name]: e.target.value });
            }}
          >
            <option>Select Account Number</option>
            {CRN.map((item) => {
              return <option>{item.accountNo}</option>;
            })}
          </select>
          <div className="mt-4">
            <button
              type="submit"
              className="btn btn-primary w-100"
              onClick={Submit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="row">
        <div className="col-md-10  m-auto ">
          {" "}
          <table className="table  ">
            <tr>
              <td className="border border-info h5">Account Number</td>
              <td className="border border-info h5">Name</td>
              <td className="border border-info h5">DOB</td>
              <td className="border border-info h5">Relation</td>
              <td className="border border-info h5">Equity</td>
              <td className="border border-info h5">Action</td>
            </tr>
            <tbody>
              {nomineeDetails.map((item) => {
                let tempDate = new Date(item.DOB);
                let month = tempDate.getMonth() + 1;
                let year = tempDate.getFullYear();
                let day = tempDate.getDate();
                let date = `${day}/${month}/${year}`;
                return (
                  <tr>
                    <td className="border border-info ">{item.accountNo}</td>
                    <td className="border border-info ">{item.name}</td>
                    <td className="border border-info ">{date}</td>
                    <td className="border border-info ">{item.relation}</td>
                    <td className="border border-info ">{item.equity}</td>
                    <td className="border border-info">
                      <button
                        className=" btn btn-danger w-100"
                        onClick={() => {
                          Remove(item._id);
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
