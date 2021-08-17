var mongoose = require('mongoose');
const userModel = require("../models/users");
const crushModel = require('../models/crushes');
const contactsModel = require('../models/contacts');
const messageModel = require('../models/messages');
const ObjectId = mongoose.Types.ObjectId;

const bcrypt = require("bcrypt");


//saves any message that is being handled to the database
const saveMessage = async function (data) {
    try {

        const chat = await messageModel.findOne({ chatId: data.user._id + data.recieverId });
        const chat2 = await messageModel.findOne({ chatId: data.recieverId + data.user._id });


        console.log(data.user._id + data.recieverId)

        if (chat) {
            console.log('pushing')
            const chats = await messageModel.updateOne({
                chatId: data.user._id + data.recieverId
            }, {
                $push: {
                    messages: data
                }
            })

            return chats;

        } else if (chat2) {

            const chats = await messageModel.updateOne({
                chatId: data.user._id + data.recieverId
            }, {
                $push: {
                    messages: data
                }
            })

            return chats;
        } else {

            const newRequest = await new messageModel({

                chatId: data.user._id + data.recieverId,
                firstUser: data.user._id,
                secondUser: data.recieverId,
                messages: [
                    data
                ]

            })

            return await newRequest.save();
        }

    } catch (error) {
        console.log(error)
    }

}

const updateMessageStatus = async function (data) {

}

module.exports = {
    saveMessage
}
