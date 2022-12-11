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
    roomId: String,
    senderId: String
    },
    {
      timestamps: true,
      collection: "chatMessages"
    }
  );

// The statics.
chatRoomSchema.statics.createChatMessage = async function (contentOriginal, contentTranslated, roomId, senderId) {
  try {
    const chatMessage = await this.create({ ontentOriginal, contentTranslated, roomId, senderId });
    return chatMessage
  } catch (error) {
    throw error;
  }
};

export default mongoose.model("chatMessage", chatMessageSchema);