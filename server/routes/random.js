import randomController from "../controllers/random.js";
import express from "express";

const randomRouter = express.Router();

randomRouter
    .post('/', randomController.handleRandomUsersSearch);

export default randomRouter;