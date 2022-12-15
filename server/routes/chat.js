import chatController from "../controllers/chat.js";
import express from "express";

const chatRouter = express.Router();

chatRouter
    .post('/createRoom', chatController.handleCreateRoom)
    .post('/sendMessage', chatController.handleSendMessage)
    .post('/getHistoryRooms', chatController.getHistoryRooms)
    .post('/getHistoryChats', chatController.getHistoryChats)
    .post('/pollLatestChat', chatController.getLatestChat);

export default chatRouter;