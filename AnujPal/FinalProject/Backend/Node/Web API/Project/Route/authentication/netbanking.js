const mongoose = require("mongoose");
const express = require("express");
const netBankingRouter = express.Router();
const netbanking = require("../../Model/netbanking");
const NetBanking = mongoose.model("NetBanking", netbanking);
const user = require("../../Model/netbanking");
const User = mongoose.model("User", user);
const verifyToken = require("../../Middleware/verifyToken");
const ensureToken = require("../../Middleware/ensureToken");
const jwt = require("jsonwebtoken");
var cryptr = require("cryptr"),
  cryptr = new cryptr("Anuj");
var nodemailer = require("nodemailer");
const transporter1 = require("../../email/email");

class demoNetBanking {
  static async login(req, res) {
    let count = 0;
    const users = await NetBanking.find();

    for (const iterator of users) {
      var userId = cryptr.decrypt(iterator.userId);
      var pass = cryptr.decrypt(iterator.pass);
      if (userId == req.body.userId && pass == req.body.pass) {
        const token = jwt.sign(
          { iterator },
          process.env.SECRET,
             {
            expiresIn: "1h",
          }
        );
        await res.json({
          token: token,
          message: "you successfully login to the system",
          accountNo: iterator.accountNo,
        });
        count = 1;
        transporter1.transporter.sendMail(
          transporter1.mailOptionsLogin,
          function (error, info) {
            if (error) {
              console.log(error.message);
            } else {
              console.log("Email sent: " + info.response);
            }
          }
        );
        break;
      }
    }
    if (count == 0) {
      res.json({ message: "Invalid userid or Password !!!!!!!!!!!" });
    }
  }

  static async signup(req, res) {
    var userId = cryptr.encrypt(req.body.userId);
    var pass = cryptr.encrypt(req.body.pass);
    const user = new NetBanking({
      userId: userId,
      pass: pass,
      role: req.body.role,
      fname: req.body.fname,
      mname:req.body.mname,
      lname: req.body.lname,
      email: req.body.email,
      phoneNo: req.body.phoneNo,
      accountNo: req.body.accountNo,
      CIF: req.body.CIF,
      balance: req.body.balance,
      branchName: req.body.branchName,
      IFSC: req.body.IFSC,
      branchCity: req.body.branchCity,
      CRN: req.body.CRN,
      address:req.body.address
    });
    const a1 = await user.save();
    transporter1.transporter.sendMail(
      transporter1.mailOptionsSignUp,
      function (error, info) {
        if (error) {
          console.log(error.message);
        } else {
          console.log("Email sent: " + info.response);
        }
      }
    );
    res.json(a1);
  }
  static async getCustomer(req, res) {
    const users = await NetBanking.find({ accountNo: req.params.accountNo });
    res.json(users);
  }
static async editUser(req,res){
  const user=await NetBanking.update({_id:req.body._id},{$set:{
    fname:req.body.fname,
    mname:req.body.mname,
    lname:req.body.lname,
    email:req.body.email,
    phoneNo:req.body.phoneNo,
    accountNo: req.body.accountNo,
    CIF: req.body.CIF,
    balance: req.body.balance,
    branchName: req.body.branchName,
    IFSC: req.body.IFSC,
    branchCity: req.body.branchCity,
    CRN: req.body.CRN,
    address:req.body.address
  }})
  res.json(user)
}
  static async getCustomerByCRN(req,res){
    const users = await NetBanking.find({ CRN: req.body.CRN });
    res.json(users);
  }
}

// API for login the system
netBankingRouter.post("/login", demoNetBanking.login);
netBankingRouter.post("/editUser", demoNetBanking.editUser);

// API for signup the Sysyem
netBankingRouter.post(
  "/signup",
  //   verifyToken,
  //   ensureToken,
  demoNetBanking.signup
);

netBankingRouter.get(
  "/getCustomer/:accountNo",
  verifyToken,
  ensureToken,
  demoNetBanking.getCustomer
);
netBankingRouter.post(
  "/getCustomerByCRN",
  verifyToken,
  ensureToken,
  demoNetBanking.getCustomerByCRN
);

module.exports = netBankingRouter;
