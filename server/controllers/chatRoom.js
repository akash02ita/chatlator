import ChatRoomModel from "../models/chatRoom.js";

// Request body  looks like this:
// {
//     "userInfo":{ 
//         "user1Guid": {

//             "username": "blah blah",
//             "primaryLanguage": "something something"
//         },
//         "user2Guid": {

//             "username": "blah blah again",
//             "primaryLanguage": "something something again"
//         }
//     }
// }



const chatRoomsController = {
    handleCreateChatRoom: async (req, res) => {
        try {
            const { userInfo } = req.body;
            const newRoom = await ChatRoomModel.createChatRoom(userInfo);
            return res.status(200).json({ success: true, newRoom });
        } catch(error) {
            return res.status(500).json({ success: false, error: error });
        }
    },
};

export default chatRoomsController;