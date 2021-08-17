const { searchAndFindUsers, getUserProfile, recievedRequests } = require("../services/messageServices");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const checkAuth = require("../middleWares/checkAuth");

module.exports = function messageController() {

//   //searches and finds a user
//   this.searchAndFindUsers = (req, res, next) => {
    
//     searchAndFindUsers(req.body).then(result => {
//       res.send({
//         success: true,
//         entry: req.body,
//         data: result
//       })
//     }).catch(err => {
//       res.send({
//         success: false,
//         data: err
//       })
//     })

//   }


};
