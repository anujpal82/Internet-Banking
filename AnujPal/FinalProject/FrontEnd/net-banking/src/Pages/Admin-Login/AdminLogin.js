import { React, useState, useEffect } from "react";
import ProjectService from "../../Services/LoginService";

export const AdminLogin = (props) => {
  const [login, setLogin] = useState({ userId: "", password: "" });
  const [user, setUser] = useState([]);
  useEffect(() => {
    ProjectService.getAllAdmin().then((res) => {
      setUser(res.data);
    });
  }, []);
  const Register = () => {
    props.history.push("/Admin/Register");
  };
  const Login = (e) => {
    e.preventDefault();
    const result = user.filter(
      (item) => item.userId === login.userId && item.password === login.password
    );
    if (result.length > 0) {
      alert("success");
      props.history.push("/Admin/Dashboard");
    } else {
      alert("UserId or password is wrong");
    }
  };
  return (
    <>
      <div className="col-md-10  col-lg-5 container mt-5 ">
        <form class="p-4 p-md-5 col-md-6 mx-auto border rounded-3 bg-light mt-5">
          <h3 className="text-center mb-5">Admin Login</h3>
          <div class="form-group-sm mb-3">
            <input
              type="text"
              className="  form-control"
              placeholder="Enter User-Id"
              name="userId"
              onChange={(e) => {
                setLogin({
                  ...login,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          </div>
          <div className="form-group-sm mb-3">
            <input
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
              name="password"
              onChange={(e) => {
                setLogin({
                  ...login,
                  [e.target.name]: e.target.value,
                });
              }}
            />
            {/* <label for="password">Password</label> */}
          </div>

          <div className="row mt-4">
            <div className="col">
              {" "}
              <button
                class="w-100 btn btn-lg btn-primary"
                onClick={Login}
                type="submit"
              >
                Login
              </button>
            </div>
            <div className="col text-center">
              {" "}
              <button
                className="btn btn-secondary btn-lg w-100 custom"
                onClick={Register}
              >
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
