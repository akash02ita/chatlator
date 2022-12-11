import { randomUUID } from "crypto";
import mongoose from "mongoose";


const chatRoomSchema = new mongoose.Schema(
  {
    guid: {
        type: String,
        default: () => randomUUID().replace(/\-/g, ""),
        unique: true
    },
    userInfo: Object,
    },
    {
      timestamps: true,
      collection: "chatRooms"
    }
  );

// The statics.
chatRoomSchema.statics.createChatRoom = async function (userInfo) {
  try {
    const chatRoom = await this.create({ userInfo });
    return chatRoom
  } catch (error) {
    throw error;
  }
};

export default mongoose.model("chatRoom", chatRoomSchema);