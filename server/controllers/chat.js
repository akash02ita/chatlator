// import from chatRoom and chatMessage the requires functions
import chatRoomsController from "../controllers/chatRoom.js";

const chatController = {
    handleCreateRoom: async (req, res) => {
        return chatRoomsController.handleCreateChatRoom(req,res);
    },
    handleSendMessage: async (req, res) => {
    },
    getHistoryRooms: async (req, res) => {
    },
    getHistoryChats: async (req, res) => {
    }
};

export default chatController;