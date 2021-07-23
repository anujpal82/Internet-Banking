import { React, useState, useEffect } from "react";
import ProjectService from "../Services/LoginService";
import { AiFillDelete } from "react-icons/ai";
import { FaRupeeSign } from "react-icons/fa";

export const Admin = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    ProjectService.getAllUser().then((res) => {
      setData(res.data);
    });
  }, [data]);
  const Delete = (id) => {
    ProjectService.AdminDelete({ accountNo: id }).then((res) => {
      console.log(res.data);
    });
  };
  return (
    <>
      <div>
        <nav class="navbar navbar-expand-md navbar-light bg-light  p-2 m-2">
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

          <div
            class="collapse navbar-collapse ml-5 "
            id="navbarSupportedContent"
          >
            <ul class="navbar-nav mr-auto align-items-center  ">
              <li class="nav-item ml-5">
                <a
                  class="nav-link  "
                  href={`http://localhost:3000/Admin/login`}
                >
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
                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
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

        <div className="container p-3 ">
          <div
            className=" text-center mt-5 "
            style={{
              fontSize: "35px",
              backgroundColor: "#022e57 ",
              color: "#deeeea",
            }}
          >
            Admin Page
          </div>
          <h3 className="text-center mt-5">Customer Details</h3>
          <table className="table text-center m-5 shadow-lg p-3 col-md-10  mx-auto">
            <tr className="border h5 m-3">
              <td className="border border-success">Name</td>
              <td className="border border-success">Account No</td>
              <td className="border border-success">Branch Name</td>
              <td className="border border-success">Balance</td>
              <td className="border border-success">Delete</td>
            </tr>
            <tbody className="mt-3 border">
              {data.map((item) => {
                return (
                  <tr>
                    <td className="border border-success">
                      {item.fname} {item.mname} {item.lname}
                    </td>
                    <td className="border border-success">{item.accountNo}</td>

                    <td className="border border-success">
                      {" "}
                      {item.branchName}
                    </td>

                    <td className="p-2 border border-success">
                      {" "}
                      {item.balance}{" "}
                      <span className="h5">
                        <FaRupeeSign />
                      </span>{" "}
                    </td>
                    <td
                      className="h3 border border-success"
                      style={{ cursor: "pointer" }}
                      onClick={() => Delete(item.accountNo)}
                    >
                      <AiFillDelete />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
