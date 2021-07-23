import React from "react";

export const ErrorPage = (props) => {
  return (
    <>
      <div className="display-4 text-center mt-5 ">
        <div className="text-center mt-5">
          {" "}
          Please Login To Access The Service !!!!!!!!!!!!!
        </div>
        <div>
          <button
            className="btn btn-large btn-primary mt-5"
            onClick={() => {
              props.history.push("/");
            }}
          >
            Go To Login
          </button>
        </div>
      </div>
    </>
  );
};
