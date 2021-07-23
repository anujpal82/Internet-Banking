import React from "react";
import Logo from "../../src/components/Images/3.jpg";
import '../components/Portal/navbar.scss'
export const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-md navbar-light bg-light">
      <a className="navbar-brand" href="http://localhost:3000/">
        <img style={{ height: "60px", width: "100px" }} alt="logo" src={Logo} />
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

      <div class="collapse navbar-collapse mr-5 ml-5" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto align-items-center  ">
          <li class="nav-item active ml-5 ">
            <a class="nav-link  " href="http://localhost:3000/">
            Home
            </a>
          </li>
          <li class="nav-item ml-5">
            <a class="nav-link  " href="#about">
              About
            </a>
          </li>
          <li class="nav-item ml-5 ">
            <a class="nav-link " href="#why">
              Why To Choose Us
            </a>
          </li>
         

        </ul>
        <form class="d-flex m-2">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success ml-2" type="submit">Search</button>
      </form>
        
      </div>
    </nav>
  );
};
