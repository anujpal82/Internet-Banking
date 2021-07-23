const mongoose = require("mongoose");
const express = require("express");
const adminRouter = express();
const netbanking = require("../../Model/netbanking");
const admin = require("../../Model/admin");
const Admin = mongoose.model("Admin", admin);
const NetBanking = mongoose.model("netbankings", netbanking);
const user = require("../../Model/netbanking");
const checkBookRequest = require("../../Model/chequeBook");
const CheckBookRequest = mongoose.model("CheckBookRequest", checkBookRequest);
const closeAccount = require("../../Model/closeAccount")
const CloseAccount = mongoose.model("CloseAccount", closeAccount)
const debitCard = require("../../Model/debitCard");
const nodeMailer = require("node-mailer");
const nominee = require("../../Model/nominee");
const Nominee = mongoose.model("Nominee", nominee);
const {
  transporter,
  debitCardApprovedRequest,
  debitCardRejectedRequest,
  checkBookRejectedRequest,
  checkBookApprovedRequest,
  mailOptionsCancelAccountApproved,
  mailOptionsCancelAccountRejected,
  mailOptionsAddNomineeApproved,
  mailOptionsAddNomineeRejected

} = require("../../email/email");

const DebitCardRequest = mongoose.model("DebitCardRequest", debitCard);
// const admin=require('../../Model/admin')
// const Admin=mongoose.model('Admin',admin)
var cryptr = require("cryptr"),
  cryptr = new cryptr("Anuj");
const jwt = require("jsonwebtoken");

class demoAdmin {
  static async getAllUser(req, res) {
    const users = await NetBanking.find();
    res.json(users);
  }
  static async getAllAdmin(req, res) {
    const users = await Admin.find();
    res.json(users);
  }

  static async DeleteUser(req, res) {
    // if (count1 === 0) {
    //     res.json("You do not have accessto this page");
    // }
    // else {
    const user = await NetBanking.deleteOne({ accountNo: req.body.accountNo });
    res.json(user);
    // }
  }
  static async registerAdmin(req, res) {
    const admin = new Admin({
      userId: req.body.userId,
      password: req.body.password,
      email: req.body.email,
    });
    const a1 = await admin.save();
    res.json(a1);
  }
  static async checkBookRequest(req, res) {
    const checkBook = await CheckBookRequest.find({});
    res.json(checkBook);
  }
  static async debitCardRequest(req, res) {
    const debitCard = await DebitCardRequest.find({});
    res.json(debitCard);
  }
  static async debitCardStatus(req, res) {
    if (req.body.status === "Rejected") {
      const debitCard = await DebitCardRequest.deleteOne({ _id: req.body._id });
      res.json(debitCard);
      await transporter.sendMail(
        debitCardRejectedRequest,
        function (error, info) {
          if (error) {
            console.log(error.message);
          } else {
            console.log("Email sent: " + info.response);
          }
        }
      );

    } else {
      const debitCard = await DebitCardRequest.updateOne(
        { _id: req.body._id },
        {
          $set: {
            status: req.body.status,
          },
        }
      );
      res.json(debitCard);
      await transporter.sendMail(
        debitCardApprovedRequest,
        function (error, info) {
          if (error) {
            console.log(error.message);
          } else {
            console.log("Email sent: " + info.response);
          }
        }
      );
    }
  }
  static async checkBookStatus(req, res) {
    if (req.body.status === "Rejected") {
      const debitCard = await CheckBookRequest.deleteOne({ _id: req.body._id });
      res.json(debitCard);
      await transporter.sendMail(
        checkBookRejectedRequest,
        function (error, info) {
          if (error) {
            console.log(error.message);
          } else {
            console.log("Email sent: " + info.response);
          }
        }
      );
    } else {
      const checkBook = await CheckBookRequest.updateOne(
        { _id: req.body._id },
        {
          $set: {
            status: req.body.status,
          },
        }
      );
      res.json(checkBook);
      await transporter.sendMail(
        checkBookApprovedRequest,
        function (error, info) {
          if (error) {
            console.log(error.message);
          } else {
            console.log("Email sent: " + info.response);
          }
        }
      );
    }
  }
  static async getCheckBookRequest(req, res) {
    const checkBook = await CheckBookRequest.find({});
    res.json(checkBook);
  }
  static async closeAccountStatus(req, res) {
    if (req.body.status === "Rejected") {
      const closeAccount = await CloseAccount.deleteOne({ _id: req.body._id });
      res.json(closeAccount);
      await transporter.sendMail(
        mailOptionsCancelAccountRejected,
        function (error, info) {
          if (error) {
            console.log(error.message);
          } else {
            console.log("Email sent: " + info.response);
          }
        }
      );
    } else {
      const closeAccount = await CloseAccount.updateOne(
        { _id: req.body._id },
        {
          $set: {
            status: req.body.status,
          },
        }
      );
      res.json(closeAccount);
      await transporter.sendMail(
        mailOptionsCancelAccountApproved,
        function (error, info) {
          if (error) {
            console.log(error.message);
          } else {
            console.log("Email sent: " + info.response);
          }
        }
      );
    }
  }
  static async nomineeRequestStatus(req, res) {
    if (req.body.status === "Rejected") {
      const closeAccount = await Nominee.deleteOne({ _id: req.body._id });
      res.json(closeAccount);
      await transporter.sendMail(
        mailOptionsAddNomineeRejected,
        function (error, info) {
          if (error) {
            console.log(error.message);
          } else {
            console.log("Email sent: " + info.response);
          }
        }
      );
    } else {
      const closeAccount = await Nominee.updateOne(
        { _id: req.body._id },
        {
          $set: {
            status: req.body.status,
          },
        }
      );
      res.json(closeAccount);
      await transporter.sendMail(
        mailOptionsAddNomineeApproved,
        function (error, info) {
          if (error) {
            console.log(error.message);
          } else {
            console.log("Email sent: " + info.response);
          }
        }
      );
    }
  }
}

// API for see all the users registered
adminRouter.get("/users", demoAdmin.getAllUser);
// API for see all the Admin registered
adminRouter.get("/getAllAdmin", demoAdmin.getAllAdmin);

// API for delete a particular customer
adminRouter.post("/delete", demoAdmin.DeleteUser);

// API fro register admin
adminRouter.post("/register", demoAdmin.registerAdmin);
adminRouter.post("/checkBookRequest", demoAdmin.checkBookRequest);
adminRouter.post("/debitCardRequest", demoAdmin.debitCardRequest);
adminRouter.post("/debitCardStatus", demoAdmin.debitCardStatus);
adminRouter.get("/getCheckBookRequest", demoAdmin.getCheckBookRequest);
adminRouter.post("/checkBookStatus", demoAdmin.checkBookStatus);
adminRouter.post("/closeAccountStatus", demoAdmin.closeAccountStatus);
adminRouter.post("/nomineeRequestStatus", demoAdmin.nomineeRequestStatus);

module.exports = adminRouter;

async function adminLogin(req, res, next) {
  var count = 0;
  const users = await NetBanking.find();

  for (const iterator of users) {
    var userId = cryptr.decrypt(iterator.userId);
    var pass = cryptr.decrypt(iterator.pass);
    var role = iterator.role;
    if (
      userId === req.body.userId &&
      pass === req.body.pass &&
      role === "admin"
    ) {
      count = 1;
    }
  }
  count1 = count;
  console.log(count1);

  next();
}
