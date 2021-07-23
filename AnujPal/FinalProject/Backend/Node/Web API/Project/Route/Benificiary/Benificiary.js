const mongoose = require("mongoose");
const express = require("express");
const BenificiaryRouter = express.Router();
BenificiaryRouter.use(express());
const benificiary = require("../../Model/Benificiary");
const Benificiary = mongoose.model("Benificiary", benificiary);
const verifyToken = require("../../Middleware/verifyToken");
const ensureToken = require("../../Middleware/ensureToken");

BenificiaryRouter.post("/addUser", async (req, res) => {
  const a1 = new Benificiary({
    fname: req.body.fname,
    mname: req.body.mname,
    lname: req.body.lname,
    IFSC: req.body.IFSC,
    CRN: req.body.CRN,
    accountNo: req.body.accountNo,
  });
  const a2 = await a1.save();
  res.json(a2);
});

BenificiaryRouter.get("/getBenificiery", async (req, res) => {
  const users = await Benificiary.find({});
  res.json(users);
});
BenificiaryRouter.post("/getBenificiery", async (req, res) => {
  const users = await Benificiary.find({});
  res.json(users);
});

BenificiaryRouter.post("/deleteBenificiary", async (req, res) => {
  const user = await Benificiary.deleteOne({ _id: req.body._id });
  res.json(req.body);
});
module.exports = BenificiaryRouter;
