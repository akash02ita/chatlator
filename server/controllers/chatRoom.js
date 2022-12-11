import ChatRoomModel from "../models/chatRoom.js";

const chatRoomsController = {
    handleCreateChatRoom: async (req, res) => {
        try {
            const { userInfo } = req.body;
            const newRoom = await ChatRoomModel.createChatRoom(userInfo);
            return res.status(200).json({ success: true, room: newRoom });
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    },

    getHistoryRooms: async (req, res) => {
        try {
            const { userGuid } = req.body;
            const filteredRooms = await ChatRoomModel.getHistoryRoomsByUserGuid(userGuid);
            return res.status(200).json({ success: true, rooms: filteredRooms })
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }
};

export default chatRoomsController;