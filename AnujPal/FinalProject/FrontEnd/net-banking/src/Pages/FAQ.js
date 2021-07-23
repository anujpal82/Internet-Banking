import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Navbar } from "../components/Portal/Navbar";

export const FAQ = (props) => {
  return (
    <>
      <Navbar id={props.match.params.id} />
      {/* 
        <div className="form-group-sm">
          <input
            type="text"
            className="form-control w-50 mx-auto " placeholder="Ask a Question" style={{height:"60px"}}
          ></input>
        </div>
      </div> */}
      <div className="container">
        <div class="   input-group mb-2 w-50 mx-auto mt-5">
          <input
            type="text"
            className="form-control w-50 mx-auto col-xs-6 "
            placeholder="Tap Keyword To Find Answer"
            style={{ height: "70px" }}
          ></input>
          <div class="input-group-append">
            <span class="input-group-text" id="basic-addon2">
              <AiOutlinePlus className="display-4 text-success" />
            </span>
          </div>
        </div>
        <p
          className="text-success text-center  mb-5 "
          style={{ fontSize: "14px" }}
        >
          You can also browse the topics below to find what you are looking for.
        </p>
        <h3 className=" text-center mb-5">Frequent Asked Question</h3>
        <div className="row m-4">
          <div className="col w-50">
            <div
              class="accordion accordion-flush W-50"
              id="accordionFlushExample"
            >
              <div class="accordion-item W-50 mt-3" style={{ border: "none" }}>
                <h2
                  class="accordion-header accordion-header-sm w-75 h-50 mx-auto "
                  id="flush-headingOne"
                >
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    Q. What are the restrictions on free use of ATMs?
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  class="accordion-collapse collapse"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div class="accordion-body w-75 mx-auto">
                    A. From 1st April 2009, the customers were given free access
                    to ATMs of all banks for cash withdrawal and balance
                    enquiry. Reserve Bank of India and Indian Bank Association
                    has decided to modify this facility. Accordingly, with
                    effect from 15th October 2009, a customer of some other bank
                    using an ATM of State Bank of India can withdraw a maximum
                    of Rs.10, 000/- per withdrawal. From 01st July 2011
                  </div>
                </div>
              </div>
              <div class="accordion-item mt-3" style={{ border: "none" }}>
                <h2 class="accordion-header w-75 mx-auto" id="flush-headingTwo">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                  >
                    Q. Who can apply for ATM-cum-Debit Card?
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  class="accordion-collapse collapse"
                  aria-labelledby="flush-headingTwo"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div class="accordion-body w-75  mx-auto">
                    A. Any individual account holder having Savings Bank or
                    Current Account, single, or joint account operated as Either
                    or Survivor / Former or Survivor / Later or Survivor/ Anyone
                    or Survivor / Pensioners, NRE account holders.
                  </div>
                </div>
              </div>
              <div class="accordion-item mt-3" style={{ border: "none" }}>
                <h2
                  class="accordion-header w-75 mx-auto"
                  id="flush-headingFive"
                >
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFive"
                    aria-expanded="false"
                    aria-controls="flush-collapseFive"
                  >
                    Q. Since there is a moratorium period, how will my
                    repayments be determined?
                  </button>
                </h2>
                <div
                  id="flush-collapseFive"
                  class="accordion-collapse collapse"
                  aria-labelledby="flush-headingFive"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div class="accordion-body w-75  mx-auto">
                    A. The outstanding interest for the moratorium period will
                    be added to the loan amount at the time of commencement of
                    the repayment. The EMI will be determined on this amount at
                    the time the repayment is to commence.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col w-75">
            {" "}
            <div class="accordion-item mt-3 " style={{ border: "none" }}>
              <h2 class="accordion-header w-75 mx-auto" id="flush-headingThree">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseThree"
                  aria-expanded="false"
                  aria-controls="flush-collapseThree"
                >
                  Q. When will I receive my ATM-cum-Debit Card and PIN?
                </button>
              </h2>
              <div
                id="flush-collapseThree"
                class="accordion-collapse collapse"
                aria-labelledby="flush-headingThree"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body w-75  mx-auto">
                  A. You will receive your card within 7 working days after
                  submitting the application, directly by Speed post at your
                  recorded address. Kindly collect your PIN from the card
                  issuing branch after receipt of the card and carry your card /
                  passbook as identity proof.
                </div>
              </div>
            </div>
            <div class="accordion-item mt-3 " style={{ border: "none" }}>
              <h2 class="accordion-header w-75 mx-auto" id="flush-headingFour">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseFour"
                  aria-expanded="false"
                  aria-controls="flush-collapseFour"
                >
                  Q. What is the validity of ATM-cum-Debit Card?
                </button>
              </h2>
              <div
                id="flush-collapseFour"
                class="accordion-collapse collapse"
                aria-labelledby="flush-headingFour"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body w-75  mx-auto">
                  A. ATM cards issued after 13th November, 2002 with Maestro
                  Logo have no expiry date.
                </div>
              </div>
            </div>
            <div class="accordion-item mt-3 " style={{ border: "none" }}>
              <h2 class="accordion-header w-75 mx-auto" id="flush-headingSix">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseSix"
                  aria-expanded="false"
                  aria-controls="flush-collapseSix"
                >
                  Q. What is EMI? How is it calculated?
                </button>
              </h2>
              <div
                id="flush-collapseSix"
                class="accordion-collapse collapse"
                aria-labelledby="flush-headingSix"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body w-75  mx-auto">
                  A. The outstanding interest for the moratorium period will be
                  added to the loan amount at the time of commencement of the
                  repayment. The EMI will be determined on this amount at the
                  time the repayment is to commence
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
