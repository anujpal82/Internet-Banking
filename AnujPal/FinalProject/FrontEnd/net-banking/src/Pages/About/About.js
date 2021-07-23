import React from "react";
import { Navbar } from "../../components/Portal/Navbar";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

import "./About.scss";

export const About = (props) => {
  return (
    <>
      <Navbar id={props.match.params.id} />
      <section id="about1" className="row">
        <div className="container ">
          <div className=" mt-5 col-md-6" id="about">
            <div className="row">
              <div className="col">
                {" "}
                <h3 className="col display-4 text-center mt-5">About</h3>
                <div className="mt-5">
                  <h3 className="text-center h5">Connect</h3>
                  <div className="text-center p-3 m-3">
                    <span className="p-3 h4">
                      <FaFacebookF />
                    </span>
                    <span className="p-3 h4">
                      <AiFillInstagram />
                    </span>
                    <span className="p-3 h4">
                      <FaTwitter />
                    </span>
                  </div>
                </div>
              </div>

              <div className="col">
                <p className="text-success mt-4 mb-4 mr-4 ml-4" id="paragraph">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                  Many desktop publishing packages and web page editors now use
                  Lorem Ipsum as their default model text, and a search for
                  'lorem ipsum' will uncover many web sites still in their
                  infancy. Various versions have evolved over the years,
                  sometimes by accident, sometimes on purpose (injected humour
                  and the like).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
