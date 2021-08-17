const router = require("express").Router();
const dataController = require("../controllers/dataController");

// const {
//   signUpValidation,
//   loginValidation
// } = require("../middleWares/userValidation");

module.exports = function() {
  var userCtl = new dataController();

  router.get("/send", userCtl.send);
  return router;
};
