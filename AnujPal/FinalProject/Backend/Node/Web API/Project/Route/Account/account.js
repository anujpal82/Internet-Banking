const mongoose = require("mongoose");
const express = require("express");
const accountRouter = express.Router();
// const account = require("../../Model/account");
// const Account = mongoose.model('Account', account)
const netbanking = require("../../Model/netbanking");
const NetBanking = mongoose.model("NetBanking", netbanking);
const loan = require("../../Model/loan");
const Loan = mongoose.model("Loan", loan);
const checkBookRequest = require("../../Model/chequeBook");
const CheckBookRequest = mongoose.model("CheckBookRequest", checkBookRequest);
const debitCardRequest = require("../../Model/debitCard");
const DebitCardRequest = mongoose.model("DebitCardRequest", debitCardRequest);
const verifyToken = require("../../Middleware/verifyToken");
const ensureToken = require("../../Middleware/ensureToken");
const miniStatement = require("../../Model/ministatement");
const MiniStatemet = mongoose.model("Statements", miniStatement);
const nominee = require("../../Model/nominee");
const Nominee = mongoose.model("Nominee", nominee);
const closeAccount = require("../../Model/closeAccount")
const CloseAccount = mongoose.model("CloseAccount", closeAccount)
const transporter1 = require("../../email/email");
const schedule = require("node-schedule");

class demoAccount {
  static async insertAccount(req, res) {
    const account = new Account({
      accountNo: req.body.accountNo,
      accountHolderName: req.body.accountHolderName,
      CIF: req.body.CIF,
      branchName: req.body.branchName,
      balance: req.body.balance,
    });
    const a1 = account.save();
    res.json(account);
  }

  static async credit(req, res) {
    const account = await NetBanking.updateOne(
      { accountNo: req.body.accountNo },
      {
        $inc: {
          balance: req.body.amount,
        },
      }
    );
    if (account.nModified == 1) {
      const statement = new MiniStatemet({
        date: new Date(),
        amount: req.body.amount,
        debitAccountNo: req.body.accountNo,
        creditAccountNo: req.body.accountNo,
        type: "Credit",

      });

      const a1 = await statement.save();
      res.json({ statementDetaile: a1, creditDetails: account });

      transporter1.transporter.sendMail(
        transporter1.mailOptionsCredit,
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
  static async delete(req, res) {
    const account = await NetBanking.deleteOne({
      accountNo: req.body.accountNo,
    });
    res.json(account);
  }
  static async debit(req, res) {
    const account = await NetBanking.updateOne(
      { accountNo: req.body.accountNo },
      {
        $inc: {
          balance: -req.body.amount,
        },
      }
    );
    if (account.nModified == 1) {
      const statement = new MiniStatemet({
        date: new Date(),
        amount: req.body.amount,
        debitAccountNo: req.body.accountNo,
        creditAccountNo: req.body.accountNo,
        type: "Debit",
      });

      const a1 = await statement.save();
      res.json({ statementDetaile: a1, creditDetails: account });
    }
  }

  static async miniStatement(req, res) {
    const statement = await MiniStatemet.find().limit(10);
    res.json(statement);
  }

  static async NEFT(req, res) {
    const debitAccount = await NetBanking.updateOne(
      { accountNo: req.body.debitAccountNo },
      {
        $inc: {
          balance: -parseInt(req.body.amount),
        },
      }
    );
    const creditAccount = await NetBanking.updateOne(
      { accountNo: req.body.creditAccountNo },
      {
        $inc: {
          balance: req.body.amount,
        },
      }

    );
    if (creditAccount.nModified == 1) {
      const debit = await NetBanking.find({ accountNo: req.body.debitAccountNo })
      const credit = await NetBanking.find({ accountNo: req.body.creditAccountNo })
      const statement = await new MiniStatemet({
        dname: debit[0].fname,
        cname: credit[0].fname,
        date: new Date(),
        amount: req.body.amount,
        debitAccountNo: req.body.debitAccountNo,
        creditAccountNo: req.body.creditAccountNo,
        type: "NEFT",
      });

      const a1 = await statement.save();
      res.json({ statementDetaile: a1, creditDetails: creditAccount });
    }
    else {
      res.json({ debitAccount, creditAccount })
    }
  }
  static async FDNEFT(req, res) {
    const debitAccount = await NetBanking.updateOne(
      { accountNo: req.body.debitAccountNo },
      {
        $inc: {
          balance: -parseInt(req.body.amount),
        },
      }
    );
    const creditAccount = await NetBanking.updateOne(
      { accountNo: req.body.creditAccountNo },
      {
        $inc: {
          balance: req.body.amount,
        },
      }
    );
    if (creditAccount.nModified == 1) {
      const debit = await NetBanking.find({ accountNo: req.body.debitAccountNo })
      const credit = await NetBanking.find({ accountNo: 110 })
      const statement = await new MiniStatemet({
        dname: debit[0].fname,
        cname: credit[0].fname,
        date: new Date(),
        amount: req.body.amount,
        debitAccountNo: req.body.debitAccountNo,
        creditAccountNo: 110,
        type: "FD",
      })

      const a1 = await statement.save();
      res.json({ statementDetaile: a1, creditDetails: creditAccount });
    }
  }
  static async loanNEFT(req, res) {
    const debitAccount = await NetBanking.updateOne(
      { accountNo: 110 },
      {
        $inc: {
          balance: -parseInt(req.body.amount),
        },
      }
    );
    const creditAccount = await NetBanking.updateOne(
      { accountNo: req.body.accountNo },
      {
        $inc: {
          balance: req.body.amount,
        },
      }
    );
    if (creditAccount.nModified == 1) {
      const debit = await NetBanking.find({ accountNo: 110 })
      const credit = await NetBanking.find({ accountNo: req.body.accountNo })
      const statement = await new MiniStatemet({
        dname: debit[0].fname,
        cname: credit[0].fname,
        date: new Date(),
        amount: req.body.amount,
        debitAccountNo: 110,
        creditAccountNo: req.body.creditAccountNo,
        type: "Loan Approve",
      })

      const a1 = await statement.save();
      res.json({ statementDetaile: a1, creditDetails: creditAccount });
    }
  }

  static async miniStatementById(req, res) {
    var cutoff = new Date(req.body.startingDate);
    var cutoff1 = new Date(req.body.endingDate);

    // MyModel.find({modificationDate: {$lt: cutoff}}, function (err, docs) { ... });
    const statements = await MiniStatemet.find({
      $or: [
        { debitAccountNo: req.body.accountNo },
        { creditAccountNo: req.body.accountNo },
      ],
      date: {
        $gte: cutoff,
        $lte: cutoff1,
      },
    })
      .limit(10)
      .sort({ date: -1 });

    res.json(statements);
    console.log(cutoff);
  }
  static async checkBookRequest(req, res) {
    const checkBookRequest = new CheckBookRequest({
      accountNo: req.body.accountNo,
      name: req.body.name,
      CIF: req.body.CIF,
      branchName: req.body.branchName,
      address: req.body.address,
      status: req.body.status,
    });
    const a1 = await checkBookRequest.save();
    res.json(a1);
  }
  static async addDebitCardRequest(req, res) {
    const request = await DebitCardRequest.insertMany([
      {
        accountNo: req.body.accountNo,
        CRN: req.body.CRN,
        name: req.body.name,
        address: req.body.address,
        cardType: req.body.cardType,
        status: req.body.status,
      },
    ]);
    res.json(request);
  }
  static async EMI(req, res) {
    const updateDoc = {
      $inc: {
        monthRemaining: -1,
      },
    };

    const loans = await Loan.find({});

    const demoLoanNo = loans.filter((item) => {
      return item.monthRemaining !== 0;
    });

    let result = demoLoanNo.map((a) => a.loanNo);
    let result1 = demoLoanNo.map((a) => a.accountNo);
    let result2 = demoLoanNo.map((a) => a.EMI);

    const loan = await Loan.updateMany({ loanNo: result }, updateDoc);
    // const netBanking=await NetBanking.updateMany({accountNo:result1},updateDoc1)
    const myFunction = async (item) => {
      const user = await Loan.find({ accountNo: item });
      const EMI = user[0].EMI;
      const updateDoc1 = {
        $inc: {
          balance: -EMI,
        },
      };
      const netBanking1 = await NetBanking.updateOne(
        { accountNo: item },
        updateDoc1
      );
      if (netBanking1.nModified === 1) {
        const statement = new MiniStatemet({
          debitAccountNo: item,
          creditAccountNo: "101",
          amount: EMI,
          type: "EMI Deduction",
          date: new Date(),
        });
        const a1 = statement.save();
        console.log(a1);
      }
    };

    const netBanking = result1.forEach(myFunction);

    res.json({ loan: loan });
  }
  static async addNominee(req, res) {
    const nominee = new Nominee({
      accountNo: req.body.accountNo,
      name: req.body.name,
      DOB: req.body.DOB,
      relation: req.body.relation,
      equity: req.body.equity,
    });
    const a1 = await nominee.save();
    res.json(a1);
  }
  static async viewNominee(req, res) {
    const viewNominee = await Nominee.find({ accountNo: req.body.accountNo });
    res.json(viewNominee);
  }
  static async deleteNominee(req, res) {
    const user = await Nominee.deleteOne({ _id: req.body._id });
    res.json(user);
  }
  static async getAllNominee(req, res) {
    const user = await Nominee.find({})
    res.json(user);
  }
  static async getCustomerByAccountNumber(req, res) {
    const user = await NetBanking.find({ accountNo: req.body.accountNo })
    res.json(user)
  }
  static async closeAccount(req, res) {
    const closeAccount = new CloseAccount({
      accountNo: req.body.accountNo,
      name: req.body.name,
      balance: req.body.balance
    })
    const a1 = await closeAccount.save();
    res.json(closeAccount)
  }

  static async getAllCloseAccount(req, res) {
    const requests = await CloseAccount.find({})
    res.json(requests)
  }
}
// API for inserting the account information
accountRouter.post(
  "/insertAccount",
  verifyToken,
  ensureToken,
  demoAccount.insertAccount
);

// API for credit amount from the account
accountRouter.post("/credit", verifyToken, ensureToken, demoAccount.credit);

// API for debit amount from the account
accountRouter.post("/debit", verifyToken, ensureToken, demoAccount.debit);

// API for getting mini satatement for tranjaction
accountRouter.post(
  "/miniStatement",
  verifyToken,
  ensureToken,
  demoAccount.miniStatement
);

// API for NEFT
accountRouter.post("/NEFT", verifyToken, ensureToken, demoAccount.NEFT);
accountRouter.post("/FDNEFT", verifyToken, ensureToken, demoAccount.FDNEFT);

// API for DELETE
accountRouter.post("/delete", verifyToken, ensureToken, demoAccount.delete);

//API for find ministatement of particular user
accountRouter.post("/miniStatementById", verifyToken, ensureToken, demoAccount.miniStatementById);
accountRouter.post("/checkBookRequest",verifyToken,ensureToken,demoAccount.checkBookRequest);
accountRouter.post("/addDebitCardRequest",verifyToken,ensureToken,demoAccount.addDebitCardRequest);
accountRouter.post("/EMI", verifyToken, ensureToken, demoAccount.EMI);
accountRouter.post("/addNominee",verifyToken,ensureToken,demoAccount.addNominee);
accountRouter.post("/viewNominee",verifyToken,ensureToken,demoAccount.viewNominee);
accountRouter.post("/deleteNominee",verifyToken,ensureToken,demoAccount.deleteNominee);
accountRouter.post("/getAllNominee",verifyToken,ensureToken,demoAccount.getAllNominee);
accountRouter.post("/loanNEFT", verifyToken, ensureToken, demoAccount.loanNEFT);
accountRouter.post("/getCustomerByAccountNumber", verifyToken, ensureToken, demoAccount.getCustomerByAccountNumber);
accountRouter.post("/closeAccount", verifyToken, ensureToken, demoAccount.closeAccount);
accountRouter.post("/getAllCloseAccount", verifyToken, ensureToken, demoAccount.getAllCloseAccount);

accountRouter.post("/LoanApprove", async (req, res) => {
  let count = await Loan.estimatedDocumentCount();
  const loanUser = new Loan({
    date: new Date(),
    loanNo: count + 501,
    CRN: req.body.CRN,
    debitAccountNo: 110,
    creditAccountNo: req.body.accountNo,
    amount: req.body.amount,
    duration: req.body.duration,
    EMI: req.body.EMI,
    monthRemaining: req.body.monthRemaining,

  });
  const a1 = await loanUser.save();
  res.json(req.body);
});
accountRouter.post("/getLoans", async (req, res) => {
  const loans = await Loan.find({ CRN: req.body.CRN });
  res.json(loans);
});

module.exports = accountRouter;
