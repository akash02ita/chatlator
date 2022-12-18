import { logmsg } from "../debug.js";
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const _fname = path.basename(__filename);

// import from chatRoom and chatMessage the requires functions
import chatRoomsController from "../controllers/chatRoom.js";
import chatMessagesController from "./chatMessage.js";

const chatController = {
    handleCreateRoom: async (req, res) => {
        return chatRoomsController.handleCreateChatRoom(req, res);
    },
    handleSendMessage: async (req, res) => {
        return chatMessagesController.handleCreateChatMessage(req, res);
    },
    getHistoryRooms: async (req, res) => {
        return chatRoomsController.getHistoryRooms(req, res);
    },
    getHistoryChats: async (req, res) => {
        return chatMessagesController.getHistoryChats(req, res);
    },
    getLatestChat: async (req, res) => {
        return chatMessagesController.getLatestChat(req, res);
    }
};

export default chatController;