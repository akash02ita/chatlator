import { randomUUID } from "crypto";
import mongoose from "mongoose";


const chatMessageSchema = new mongoose.Schema(
  {
    guid: {
        type: String,
        default: () => randomUUID().replace(/\-/g, ""),
        unique: true
    },
    contentOriginal: String,
    contentTranslated: String,
    roomGuid: String,
    senderGuid: String
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
    throw error;
  }
};

export default mongoose.model("ChatMessage", chatMessageSchema);