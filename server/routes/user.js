import usersController from "../controllers/user.js";
import chatRoomsController from "../controllers/chatRoom.js";
import express from "express";

const usersRouter = express.Router();

usersRouter
    .get('/', usersController.handleGetUsers)
    .post('/', usersController.handleCreateUser);

export default usersRouter;