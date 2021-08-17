const router = require("express").Router();
const messageController = require("../controllers/messageController");
const auth = require("../middleWares/checkAuth");
const {
  signUpValidation,
  loginValidation
} = require("../middleWares/userValidation");

module.exports = function() {
  var messageCtl = new messageController();

  // router.post("/signup", authCtl.signUp);
//   router.post("/signup", signUpValidation, authCtl.signUp);
 
  return router;
};
