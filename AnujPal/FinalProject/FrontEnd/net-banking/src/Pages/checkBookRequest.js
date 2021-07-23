import React, { useEffect, useState } from "react";
import ProjectService from "../Services/LoginService";

export const CheckBookRequest = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    ProjectService.getCheckBookRequest().then((res) => {
      setData(res.data);
    });
  }, [data]);
  // const Approved = (id, status) => {
  //   let status1 =
  //     status === "Rejected"
  //       ? "Rejected"
  //       : status === "Approved"
  //       ? "Rejected"
  //       : "Approved";
  //   console.log(status, status1);
  //   ProjectService.checkBookStatus({_id:id,status:status1}).then((res)=>{
  //     console.log(res.data);
  //   })
  // };
  const Approve = (id) => {
    ProjectService.checkBookStatus({ _id: id, status: "Approved" }).then((res) => {
      console.log(res.data)
    })
  }
  const Reject = (id) => {
    ProjectService.checkBookStatus({ _id: id, status: "Rejected" }).then((res) => {
      console.log(res.data)
    })
  }
  return (
    <>
      <nav class="navbar navbar-expand-md navbar-light bg-light p-2 m-2">
        <a
          class="navbar-brand mr-5 ml-5"
          href={`http://localhost:3000/Admin/Dashboard`}
        >
          Admin
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse ml-5 " id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto align-items-center  ">
            <li class="nav-item ml-5">
              <a class="nav-link  " href={`http://localhost:3000/Admin/login`}>
                Back To Login
              </a>
            </li>
            <li class="nav-item ml-5">
              <a
                class="nav-link  "
                href={`http://localhost:3000/Admin/Dashboard`}
              >
                Home
              </a>
            </li>

            <li class="nav-item  ml-5">
              {/* <a class="nav-link" href={`http://localhost:3000/Portal/${id}/NEFT`}>
              Transfer
            </a> */}
              <div class="dropdown">
                <button
                  class="btn btn-secondary dropdown-toggle h5"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Requests
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a
                    class="dropdown-item"
                    href={`http://localhost:3000/Admin/checkBookRequest`}
                  >
                    CheckBook Requests
                  </a>
                  <a
                    className="dropdown-item"
                    href={`http://localhost:3000/Admin/debitCardRequest`}
                  >
                    Debit Card Request
                  </a>
                  <a
                    className="dropdown-item"
                    href={`http://localhost:3000/Admin/cancelRequest`}
                  >
                    Account Cancel Request
                  </a>
                  <a
                    className="dropdown-item"
                    href={`http://localhost:3000/Admin/nomineeRequest`}
                  >
                    Nominee Request
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container">
        <h3 className="text-center">Check Book Requests</h3>
        <table className="table col-md-8 mx-auto mt-5 ">
          <tr className="border border-secondary">
            <td className="border-bottom border-secondary">Account Number</td>
            <td className="border-bottom border-secondary">CIF</td>
            <td className="border-bottom border-secondary">Name</td>
            <td className="border-bottom border-secondary">branchName</td>
            <td className="border-bottom border-secondary">Status</td>
            <td className="border-bottom border-secondary">Action</td>
          </tr>
          <tbody>
            {data.map((item) => {
              return (
                <tr className="border border-secondary">
                  <td >{item.accountNo}</td>
                  <td>{item.CIF}</td>
                  <td>{item.name}</td>
                  <td>{item.branchName}</td>
                  <td>{item.status}</td>
                  <td>

                    <div className="row">
                      <div className="col">
                        {" "}
                        <button className="btn btn-primary w-100" disabled={item.status === "Approved" ? true : false} onClick={() => { Approve(item._id) }}>
                          Approve
                        </button>
                      </div>
                      <div className="col">
                        {" "}
                        <button className="btn btn-danger w-100" onClick={() => { Reject(item._id) }} >
                          Reject
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
