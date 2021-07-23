import React, { useEffect, useState } from "react";
import ProjectService from '../Services/LoginService'

export default function CancelAccount() {
    const [closeAccount, setCloseAccount] = useState({})
    useEffect(() => {
        ProjectService.getAllcloseAccount().then(async (res) => {
            await setCloseAccount(res.data)
        })
    }, [closeAccount])
    const Approve = (id, status) => {
        const sd = status === "Pending" ? "Approved" : status
        ProjectService.closeAccountStatus({ _id: id, status: sd }).then((res) => {
            console.log(res.data)
        })
        console.log(id, sd);
    }
    const Reject = (id, status) => {
        ProjectService.closeAccountStatus({ _id: id, status: "Rejected" }).then((res) => {
            console.log(res.data)
        })
        console.log(id, status);
    }
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
                <div className="container">
                    <h3 className="text-center">Account deactivation Request</h3>
                    {closeAccount.length > 0 ?
                        <table className=" col-md-8 mx-auto mt-5">
                            <tr className="border  border-secondary text-center " style={{ height: "50px" }} >
                                <td className=" border border-success" >Account Number</td>
                                <td className="border border-success">Name</td>
                                <td className="border border-success">Status</td>
                                <td colSpan="2" className="border border-success" className="text-center">Action</td>

                            </tr>
                            <tbody className="mt-3">{closeAccount.map((item) => {
                                return <tr className="border border-secondary"><td className="text-center border border-secondary">{item.accountNo}</td><td className="text-center border border-secondary">{item.name}</td><td className="text-center border border-secondary">{item.status}</td>
                                    <td>

                                        <div className="row m-2">
                                            <div className="col">
                                                {" "}
                                                <button className="btn btn-primary w-100" disabled={item.status === "Approved" ? true : false} onClick={() => { Approve(item._id, item.status) }}>
                                                    Approve
                                                </button>
                                            </div>
                                            <div className="col">
                                                {" "}
                                                <button className="btn btn-danger w-100" onClick={() => { Reject(item._id, item.status) }} >
                                                    Reject
                                                </button>
                                            </div>
                                        </div></td></tr>
                            })}</tbody>
                        </table> : <div className="text-danger text-center my-5 display-3">!!!!!!!!! So far no such request has come</div>
                    }

                </div>
            </div>
        </>
    );
}
