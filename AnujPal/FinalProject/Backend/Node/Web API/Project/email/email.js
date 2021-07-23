var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "anujpal631998@gmail.com",
    pass: "anujpal631998.",
  },
});

var mailOptionsSignUp = {
  from: "anujpal631998@gmail.com",
  to: "anujpal160180107030@gmail.com",
  subject: "SignUp",
  html: `You Signup the system!!!!!!!!`,
};
var debitCardApprovedRequest = {
  from: "anujpal631998@gmail.com",
  to: "anujpal160180107030@gmail.com",
  subject: "Approval Of Debit Card",
  html: `Your Request Of Debit card Is Approved!!!!!!!!`,
};
var checkBookApprovedRequest = {
  from: "anujpal631998@gmail.com",
  to: "anujpal160180107030@gmail.com",
  subject: "Approval Of Check Book",
  html: `Your Request Of Check Book Is Approved!!!!!!!!`,
};
var debitCardRejectedRequest = {
  from: "anujpal631998@gmail.com",
  to: "anujpal160180107030@gmail.com",
  subject: "Rejection Of Debit Card",
  html: `Your Request Of Debit card Is Rejected!!!!!!!!`,
};
var checkBookRejectedRequest = {
  from: "anujpal631998@gmail.com",
  to: "anujpal160180107030@gmail.com",
  subject: "Rejection Of Check Book",
  html: `Your Request Of Check Book Is Rejected!!!!!!!!`,
};

var mailOptionsLogin = {
  from: "anujpal631998@gmail.com",
  to: "anujpal160180107030@gmail.com",
  subject: "Login",
  html: "<h3>You login to the system !!!!!!!!!</h3>",
};

var mailOptionsCredit = {
  from: "anujpal631998@gmail.com",
  to: "anujpal160180107030@gmail.com",
  subject: "Credit",
  html: "</h3>You Credited Some Amount </h3>",
};
var mailOptionsDebit = {
  from: "anujpal631998@gmail.com",
  to: "anujpal160180107030@gmail.com",
  subject: "Debit",
  html: "</h3>You Debited Some Amount </h3>",
};
var mailOptionsCancelAccountApproved= {
  from: "anujpal631998@gmail.com",
  to: "anujpal160180107030@gmail.com",
  subject: "Approved",
  html: "</h3>Your account deactivation request is Approved </h3>",
};
var mailOptionsCancelAccountRejected= {
  from: "anujpal631998@gmail.com",
  to: "anujpal160180107030@gmail.com",
  subject: "Rejected",
  html: "</h3>Your account deactivation request is Rejected </h3>",
};
var mailOptionsAddNomineeRejected= {
  from: "anujpal631998@gmail.com",
  to: "anujpal160180107030@gmail.com",
  subject: "Rejected",
  html: "</h3>Your Add Nominee request is Rejected </h3>",
};
var mailOptionsAddNomineeApproved= {
  from: "anujpal631998@gmail.com",
  to: "anujpal160180107030@gmail.com",
  subject: "Rejected",
  html: "</h3>Your Add Nominee request is Approved </h3>",
};

module.exports = {
  transporter,
  mailOptionsLogin,
  mailOptionsSignUp,
  mailOptionsCredit,
  mailOptionsDebit,
  debitCardRejectedRequest,
  debitCardApprovedRequest,
  checkBookRejectedRequest,
  checkBookApprovedRequest,
  mailOptionsCancelAccountApproved,
  mailOptionsCancelAccountRejected,
  mailOptionsAddNomineeApproved,
  mailOptionsAddNomineeRejected
};
