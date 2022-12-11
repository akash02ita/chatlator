import ChatMessageModel from "../models/chatMessage.js";

// {
//     "contentOriginal": "This is a message",
//     "roomGuid": "The guid of the room to which the chat Belongs",
//     "senderGuid": "The user Guid of the sender sending the stuff in"
// }


const chatMessagesController = {
    // Need to change this afterwards
    translateMessage: function() {
        var temp = this;
        return "blah blah this message got Translated";
    },

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
    }

    
};

export default chatMessagesController;