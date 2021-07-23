import {  useState } from "react";

import ProjectService from "../../Services/LoginService";

export const AdminRegister = (props) => {
  const [register, setRegister] = useState({
    email: "",
    password: "",
    userId: "",
  });
  const Register = (e) => {
    e.preventDefault();
    ProjectService.AdminRegister(register).then((res) => {
      console.log(res.data);
      alert("registered successfully");
    });
  };
  return (
    <div className="col-md-10 mx-auto col-lg-5 container mt-5">
      <form class="p-4 p-md-5 mt-5  col-md-6 mx-auto border rounded-3 bg-light">
        <h3 className="text-center mb-5">Admin Register</h3>
        <div class="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Enter E-mail"
            name="email"
            value={register.email}
            onChange={(e) => {
              setRegister({ ...register, [e.target.name]: e.target.value });
            }}
          />
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter User-Id"
            name="userId"
            value={register.userId}
            onChange={(e) => {
              setRegister({ ...register, [e.target.name]: e.target.value });
            }}
          />
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
            name="password"
            value={register.password}
            onChange={(e) => {
              setRegister({ ...register, [e.target.name]: e.target.value });
            }}
          />
        </div>

        <div className="row mt-4">
          <div className="col text-center">
            {" "}
            <button
              className="btn btn-primary btn-lg w-100 custom"
              onClick={Register}
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
