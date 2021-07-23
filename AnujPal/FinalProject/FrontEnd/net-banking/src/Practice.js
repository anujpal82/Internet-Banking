import React from "react";
import FireBase from "../src/Fire-Base/FireBase";
export const Practice = () => {
  const handleClick = () => {
    let recaptcha = new FireBase.auth.RecaptchaVerifier("recaptcha-container");
    let number = "+918128501852";
    FireBase.auth()
      .signInWithPhoneNumber(number, recaptcha)
      .then((res) => {
        let code = prompt("enter otp", "");
        if (code == null) return;
        res
          .confirm(code)
          .then((result) => {
            console.log(result.user, "user");
            document.querySelector("label").textContent =
              result.user.phoneNumber + "Number verified";
          })
          .catch((err) => {
            console.log(err);
          });
      });
  };
  return (
    <div>
    <div id="recaptcha-container"></div>
      <label></label>
      <button type="button" onClick={handleClick}>
        Click Me
      </button>
    </div>
  );
};
