import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { Navbar } from "./components/Portal/Navbar";
import { Portal } from "./components/Portal/Portal";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { SignUp } from "./components/SignUp/SignUp";
import { About } from "./Pages/About/About";
import { addBeneficiary } from "./Pages/addBeneficiary";
import { Admin } from "./Pages/Admin";
import { AdminLogin } from "./Pages/Admin-Login/AdminLogin";
import { AdminRegister } from "./Pages/AdminRegister/AdminRegister";
import { ApplyForCheque } from "./Pages/ApplyForCheque";
import { ApplyForDebit } from "./Pages/ApplyForDebit";
import { ApplyForFD } from "./Pages/ApplyForFD";
import { ApplyForNominee } from "./Pages/ApplyForNominee";
import cancelAccount from "./Pages/cancelAccount";
import { CheckBookRequest } from "./Pages/checkBookRequest";
import { CloseAccount } from "./Pages/CloseAccount";
import { DebitCardRequest } from "./Pages/debitCardRequest";
import { EditProfile } from "./Pages/editProfile";
import { ErrorPage } from "./Pages/ErrorPage";
import { FAQ } from "./Pages/FAQ";
import { Home } from "./Pages/Home/Home";
import { Loan } from "./Pages/Loan/Loan";
import { NEFT } from "./Pages/NEFT";
import { NEFT1 } from "./Pages/NEFT1";
import { NomineeRequest } from "./Pages/NomineeRequest";
import { Practice } from "./Pages/Practice";
import { ViewLoanStatus } from "./Pages/viewLoanStatus";
import { ViewNominee } from "./Pages/viewNominee";
import { Withdrawl } from "./Pages/Withdrawl";



function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Login}></Route>
          <Route path="/Practice" exact component={Practice}></Route>
          <Route path="/Admin/Login" exact component={AdminLogin}></Route>
          <Route path="/Admin/Dashboard" exact component={Admin}></Route>
          <Route path="/Admin/checkBookRequest" exact component={CheckBookRequest}></Route>
          <Route path="/Admin/debitCardRequest" exact component={DebitCardRequest}></Route>
          <Route path="/Admin/cancelRequest" exact component={cancelAccount}></Route>
          <Route path="/Admin/nomineeRequest" exact component={NomineeRequest}></Route>
          <Route path="/Admin/Register" exact component={AdminRegister}></Route>
          <Route path="/Navbar" exact component={Navbar}></Route>
          <PrivateRoute path="/Portal/:id" exact component={Portal}></PrivateRoute>
          <PrivateRoute path="/Portal/:id/editProfile" exact component={EditProfile}></PrivateRoute>
          <PrivateRoute path="/Portal/:id/ApplyForCheque" exact component={ApplyForCheque}></PrivateRoute>
          <PrivateRoute path="/Portal/:id/ApplyForDebit" exact component={ApplyForDebit}></PrivateRoute>
          <PrivateRoute path="/Portal/:id/ApplyForFD" exact component={ApplyForFD}></PrivateRoute>
          <PrivateRoute path="/Portal/:id/ApplyForNominee" exact component={ApplyForNominee}></PrivateRoute>
          <PrivateRoute path="/Portal/:id/viewNominee" exact component={ViewNominee}></PrivateRoute>
          <PrivateRoute path="/Portal/:id/Loan" exact component={Loan}></PrivateRoute>
          <PrivateRoute path="/Portal/:id/LoanStatus" exact component={ViewLoanStatus}></PrivateRoute>
          <PrivateRoute path="/Home/:id" exact component={Home}></PrivateRoute>
          <PrivateRoute path="/Portal/:id/Withdrawl" exact component={Withdrawl}></PrivateRoute>
          <PrivateRoute path="/Portal/:id/NEFT1" exact component={NEFT1}></PrivateRoute>
          <PrivateRoute path="/Portal/:id/NEFT1/addBeneficiary" exact component={addBeneficiary}></PrivateRoute>
          <PrivateRoute path="/Portal/:id/NEFT" exact component={NEFT}></PrivateRoute>
          <PrivateRoute path="/Portal/:id/FAQ" exact component={FAQ}></PrivateRoute>
          <PrivateRoute path="/Portal/:id/Delete" exact component={CloseAccount}></PrivateRoute>
          <Route path="/Portal/:id/About" exact component={About}></Route>
          <Route path="/Error" exact component={ErrorPage}></Route>
          <Route path="/SignUp" exact component={SignUp}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
