import randomController from "../controllers/random.js";
import express from "express";

const randomRouter = express.Router();

randomRouter
    .post('/', randomController.handleRandomUsersSearch)
    .post('/', randomController.handleRandomUsers_PR); // PR = Pair Request.

export default randomRouter;