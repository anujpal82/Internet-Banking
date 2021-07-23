import axios from "axios";

const LOGIN_BASE_URL = "http://localhost:5000/home/netBanking";
const ACCOUNT_BASE_URL = "http://localhost:5000/home/account";
const STATEMENT = "http://localhost:5000/home/account/ministatement";
const ADMIN = "http://localhost:5000/home/admin";
const Benificiary = "http://localhost:5000/home/benificiary";

class LoginService {
  login(object) {
    return axios.post(LOGIN_BASE_URL + "/login", object);
  }

  signUp(object) {
    return axios.post(LOGIN_BASE_URL + "/signUp", object);
  }
  editUser(object) {
    return axios.post(LOGIN_BASE_URL + "/editUser", object);
  }
  getCustomer(CustomerId) {
    return axios.get(LOGIN_BASE_URL + "/getCustomer/" + CustomerId);
  }
  getCustomerByCRN(obj) {
    return axios.post(LOGIN_BASE_URL + "/getCustomerByCRN", obj);
  }
  getCustomerByAccountNumber(obj) {
    return axios.post(ACCOUNT_BASE_URL + "/getCustomerByAccountNumber", obj);
  }

  credit(object) {
    return axios.post(ACCOUNT_BASE_URL + "/credit", object);
  }
  loanApprove(object) {
    return axios.post(ACCOUNT_BASE_URL + "/loanApprove", object);
  }
  loanNEFT(object) {
    return axios.post(ACCOUNT_BASE_URL + "/loanNEFT", object);
  }
  closeAccount(object) {
    return axios.post(ACCOUNT_BASE_URL + "/closeAccount", object);
  }
  getAllcloseAccount() {
    return axios.post(ACCOUNT_BASE_URL + "/getAllCloseAccount");
  }
  AddBenificiary(object) {
    return axios.post(Benificiary + "/addUser", object);
  }
  getBenificiary() {
    return axios.post(Benificiary + "/getBenificiery");
  }
  deleteBenificiary(object) {
    return axios.post(Benificiary + "/deleteBenificiary", object);
  }
  debit(object) {
    return axios.post(ACCOUNT_BASE_URL + "/debit", object);
  }
  NEFT(object) {
    return axios.post(ACCOUNT_BASE_URL + "/NEFT", object);
  }
  FDNEFT(object) {
    return axios.post(ACCOUNT_BASE_URL + "/FDNEFT", object);
  }
  Delete(object) {
    return axios.post(ACCOUNT_BASE_URL + "/delete", object);
  }
  MiniStatementById(object) {
    return axios.post(ACCOUNT_BASE_URL + "/ministatementById", object);
  }
  GetLoans(object) {
    return axios.post(ACCOUNT_BASE_URL + "/getLoans", object);
  }
  addNominee(object) {
    return axios.post(ACCOUNT_BASE_URL + "/addNominee", object);
  }
  viewNominee(object) {
    return axios.post(ACCOUNT_BASE_URL + "/viewNominee", object);
  }
  deleteNominee(object) {
    return axios.post(ACCOUNT_BASE_URL + "/deleteNominee", object);
  }
  getAllNominee() {
    return axios.post(ACCOUNT_BASE_URL + "/getAllNominee");
  }
  checkBookRequest(object) {
    return axios.post(ACCOUNT_BASE_URL + "/checkBookRequest", object);
  }
  getCheckBookRequest(object) {
    return axios.get(ADMIN + "/getCheckBookRequest", object);
  }
  addDebitCardRequest(object) {
    return axios.post(ACCOUNT_BASE_URL + "/addDebitCardRequest", object);
  }
  EMI() {
    return axios.post(ACCOUNT_BASE_URL + "/EMI");
  }
  MiniStatement() {
    return axios.post(STATEMENT);
  }
  getAllUser() {
    return axios.get(ADMIN + "/users");
  }
  getAllAdmin() {
    return axios.get(ADMIN + "/getAllAdmin");
  }
  debitCardRequest() {
    return axios.post(ADMIN + "/debitCardRequest");
  }
  debitCardStatus(object) {
    return axios.post(ADMIN + "/debitCardStatus", object);
  }
  checkBookStatus(object) {
    return axios.post(ADMIN + "/checkBookStatus", object);
  }
  closeAccountStatus(object) {
    return axios.post(ADMIN + "/closeAccountStatus", object);
  }
  nomineeRequestStatus(object) {
    return axios.post(ADMIN + "/nomineeRequestStatus", object);
  }

  AdminDelete(obj) {
    return axios.post(ADMIN + "/delete", obj);
  }
  AdminRegister(obj) {
    return axios.post(ADMIN + "/register", obj);
  }
 
}

export default new LoginService();
