import ChatMessageModel from "../models/chatMessage.js";
import translate from 'google-translate-api-x';

// {
//     "contentOriginal": "This is a message",
//     "languageOriginal" too bro
//     "languageTranslate": "Translate language",  
//     "roomGuid": "The guid of the room to which the chat Belongs",
//     "senderGuid": "The user Guid of the sender sending the stuff in"
// }

// Need to still implement this
/*
    idea1: use existing javascript library for translation
    idea2: use google api calls or somethings similar
    idea3: use `translate.google.com/m` and parse html translated code
*/

const LANG_CODES = {
    "English": "en",
    "French": "fr",
    "Spanish": "es",
    "German": "de",
    "Chinese": "zh-TW",
    "Arabic": "ar",
    "Hindi": "hi"
};

const chatMessagesController = {
    handleCreateChatMessage: async (req, res) => {
        try {
            const { contentOriginal, languageOriginal, languageTranslate, roomGuid, senderGuid } = req.body;
            // Find the receiver and then the primary language of the receiver using
            // roomGuid and senderGuid and then feed it to the translate message
            const apiRes = await translate(contentOriginal, {from:LANG_CODES[languageOriginal], to:LANG_CODES[languageTranslate]});

            const contentTranslated = apiRes.text;
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
    },
    
    getLatestChat: async (req, res) => {
        try {
            const { roomGuid } = req.body;
            const latestChat = await ChatMessageModel.getLatestChatByRoomGuid(roomGuid);
            return res.status(200).json({ success: true, chats: latestChat });
            
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }
};

export default chatMessagesController;