import randomController from "../controllers/random.js";
import express from "express";

const randomRouter = express.Router();

randomRouter
    .post('/search', randomController.handleRandomUsersSearch)
    .post('/send/pairRequest', randomController.handlePairUpRequest)
    .post('/send/pairConfirmation', randomController.handlePairUpConfirmation)
    .post('/receive/pairStatus', randomController.handlePairStatus);

export default randomRouter;