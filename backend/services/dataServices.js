var mongoose = require('mongoose');
const dataModel = require("../models/users");

const bcrypt = require("bcrypt");

//searches and finds users with name
const send = async function (data) {

  console.log(data)
  // const arr = await userModel.aggregate([
  //   {
  //     $match:
  //     {
  //       $or:
  //         [
  //           { firstName: {$regex:  searchData.search.trim } },
  //           { phone: searchData.search },
  //           { lastName: searchData.search }
  //         ]
  //     }
  //   },
  //   // { $group: { _id: null, count: { $sum: 1 } } }
  // ]);

  // const filtered = await arr.reduce((a, o) => (a.push(
  //   {
  //     _id: o._id,
  //     firstName: o.firstName,
  //     lastName: o.lastName,
  //     email: o.email
  //   }), a), [])

  return await data;

}


//gets the users profil details for th profile page
const getUserProfile = async function (data) {

  //gets the number of friends
  const friends = await contactsModel.aggregate(
    [
      {
        $match: { userId: ObjectId(data.userId), "contacts.requestStatus": "pending" }
      },
      {
        $group: {
          _id: "$userId",
          total: { $sum: { $size: "$contacts" } }
        }
      }
    ]
  );

  //gets the number of crushes
  const crushes = await crushModel.aggregate(
    [
      {
        $match: { userId: ObjectId(data.userId) }
      },
      {
        $group: {
          _id: "$userId",
          total: { $sum: { $size: "$crushs" } }
        }
      }
    ]
  );

  //gets the user details
  // const user = await userModel.findOne({ _id: data.userId });


  return await { user, crushes, friends }
}


//gets all my pending and unaccepted friend requests
const recievedRequests = async function (userId) {

}







module.exports = {
  send,
  getUserProfile,
  // findUserWithId,
  // loginUser,
  // findUserWithEmail,
  // saveChangesToUser,
  // editUser,
  // dashboard
}