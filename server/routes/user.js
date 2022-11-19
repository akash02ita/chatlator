import usersController from "../controllers/user.js";
import express from "express";

const usersRouter = express.Router();

usersRouter.get('/', usersController.getOneUser);

export default usersRouter;