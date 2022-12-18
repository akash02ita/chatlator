import { randomUUID } from "crypto";
import mongoose from "mongoose";

import { logmsg } from "../debug.js";
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const _fname = path.basename(__filename);

const chatMessageSchema = new mongoose.Schema(
  {
    guid: {
        type: String,
        default: () => randomUUID().replace(/\-/g, ""),
        unique: true
    },
    contentOriginal: {
      type: String,
      required: true
    },
    contentTranslated: {
      type: String,
      required: true
    },
    roomGuid:  {
      type: String,
      required: true
    },
    senderGuid: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    collection: "chatMessages"
  }
);

chatMessageSchema.statics.createChatMessage = async function (contentOriginal, contentTranslated, roomGuid, senderGuid) {
  try {
    const chatMessage = await this.create({ contentOriginal, contentTranslated, roomGuid, senderGuid });
    return chatMessage;
  } catch (error) {
    logmsg(_fname, `${roomGuid}: failed message create: ${error}`);
    throw error;
  }
};

chatMessageSchema.statics.getHistoryChatsByRoomGuid = async function (roomGuid) {
  try {
    const filteredChats = await this.find({ roomGuid: roomGuid });
    return filteredChats;

  } catch (error) {
    throw error;
  }
}

chatMessageSchema.statics.getLatestChatByRoomGuid = async function (roomGuid) {
  try {
    /*
      both approaches work, but the first line seems a better choice. For example if there nothing found:
      - the first one will have null and return null
      - the second one might be undefined and not probably ideal (try a guid id that has no chat messages. That will make more sense)
    */
    // https://stackoverflow.com/questions/12467102/how-to-get-the-latest-and-oldest-record-in-mongoose-js-or-just-the-timespan-bet
    const latestChat = await this.findOne({ roomGuid: roomGuid }, {}, { sort: { 'createdAt' : -1 } }); // works
    // const [latestChat] = await this.find({ roomGuid: roomGuid }).sort({createdAt: -1}).limit(1); // even this one works
    // logmsg(_fname, "latestChat is ", latestChat);
    return latestChat;
  
  } catch (error) {
    throw error;
  }
}

export default mongoose.model("ChatMessage", chatMessageSchema);