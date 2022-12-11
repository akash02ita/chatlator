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
    }
};

export default chatController;