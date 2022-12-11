import { randomUUID } from "crypto";
import mongoose from "mongoose";


export const CHAT_ROOM_TYPES = {
    CONSUMER_TO_CONSUMER: "consumer-to-consumer",
    // CONSUMER_TO_SUPPORT: "consumer-to-support", Don't think we'll need this.
  };


// source: https://www.freecodecamp.org/news/create-a-professional-node-express/

const chatRoomSchema = new mongoose.Schema(
    {
      _id: { // might have to be changed to guid instead of _id.
        type: String,
        default: () => uuidv4().replace(/\-/g, ""), // We are not using uuidv4. // We'll be using randomUUID() from "crypto"
      },
      userIds: Array, // Should only have the IDs of the people in the chat
      type: String,
      chatInitiator: String, // Will probably not need this.
    },
    {
      timestamps: true,
      collection: "chatrooms", // ?
    }
  );

// The statics.
chatRoomSchema.statics.initiateChat = async function (
	userIds, type, chatInitiator
) {
  try {
    const availableRoom = await this.findOne({
      userIds: {
        $size: userIds.length,
        $all: [...userIds],
      },
      type,
    });
    if (availableRoom) {
      return {
        isNew: false,
        message: 'retrieving an old chat room',
        chatRoomId: availableRoom._doc._id,
        type: availableRoom._doc.type,
      };
    }

    const newRoom = await this.create({ userIds, type, chatInitiator });
    return {
      isNew: true,
      message: 'creating a new chatroom',
      chatRoomId: newRoom._doc._id,
      type: newRoom._doc.type,
    };
  } catch (error) {
    console.log('error on start chat method', error);
    throw error;
  }
}

export default mongoose.model("ChatRoom", chatRoomSchema);