import usersController from "../controllers/user.js";
import express from "express";

const usersRouter = express.Router();

usersRouter
    .get('/', usersController.getUsers)
    .post('/', usersController.createUser);

export default usersRouter;