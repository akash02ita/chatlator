import usersController from "../controllers/user.js";
import express from "express";

const usersRouter = express.Router();

usersRouter
    .post('/login', usersController.handleFindUser)
    .post('/signup', usersController.handleCreateUser);

export default usersRouter;