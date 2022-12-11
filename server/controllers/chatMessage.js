import ChatMessageModel from "../models/chatMessage.js";

// {
//     "contentOriginal": "This is a message",
//     "roomGuid": "The guid of the room to which the chat Belongs",
//     "senderGuid": "The user Guid of the sender sending the stuff in"
// }

// Need to still implement this
/*
    idea1: use existing javascript library for translation
    idea2: use google api calls or somethings similar
    idea3: use `translate.google.com/m` and parse html translated code
*/
const translateMessage = () => {
    return "TODO: yet translation";
}

const chatMessagesController = {
    handleCreateChatMessage: async (req, res) => {
        try {
            const { contentOriginal, roomGuid, senderGuid } = req.body;
            // Find the receiver and then the primary language of the receiver using
            // roomGuid and senderGuid and then feed it to the translate message
            const translateLanguage = "some Language"; // need to get this using 
            const contentTranslated = "blah translated";

            const newMessage = await ChatMessageModel.createChatMessage(contentOriginal, contentTranslated, roomGuid, senderGuid);
            return res.status(200).json({ success: true, message: newMessage });
        } catch(error) {
            return res.status(500).json({ success: false, error: error });
        }
    },

    getHistoryChats: async (req, res) => {
        try {
            const { roomGuid } = req.body;
            const filteredChats = await ChatMessageModel.getHistoryChatsByRoomGuid(roomGuid);
            return res.status(200).json({ success: true, chats: filteredChats });
            
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }
};

export default chatMessagesController;