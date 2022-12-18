import UserModel, { PRIMARY_LANGUAGES } from "../models/user.js";
import ChatRoomModel from "../models/chatRoom.js";

import { logmsg } from "../debug.js";
import path from "path"
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const _fname = path.basename(__filename);

const usersController = {
    handleCreateUser: async (req, res) => {
        try {
            const { name, email, password, primaryLanguage } = req.body;
            // const previousUsers = await UserModel.find({});
            const newUser = await UserModel.createUser(name, email, password, primaryLanguage);
            // const userInfos = [];
            // previousUsers.forEach((puser) => {
            //     const userInfo = {};
            //     userInfo[puser.guid] = {"primaryLanguage": puser.primaryLanguage, "name": puser.name};
            //     userInfo[newUser.guid] = {"primaryLanguage": newUser.primaryLanguage, "name": newUser.name};
            //     // logmsg(_fname, "new user info is ", userInfo);
            //     userInfos.push(userInfo);
            // });
            // for (const userInfo of userInfos) {
            //     try {
            //         const newRoom = await ChatRoomModel.createChatRoom(userInfo);
            //     } catch (error) {
            //         return res.status(500).json({ success: false, message:"Error creating the accounts", error: error });
            //     }
            // }
            return res.status(200).json({ success: true, message:"Account successfully created", user: newUser });
        } catch(error) {
            return res.status(500).json({ success: false, message:"Error creating the account", error: error });
        }
    },


    handleFindUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const givenUser = await UserModel.findUser(email, password);
            return res.status(200).json({ success: true, message: "Login Successful", user: givenUser });
        } catch(error) {
            return res.status(500).json({ success: false, message: "Login Unsuccessful", error: error });
        }
    },
};

export default usersController;