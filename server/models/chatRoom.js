import { randomUUID } from "crypto";
import mongoose from "mongoose";
import { userInfo } from "os";


const chatRoomSchema = new mongoose.Schema(
  {
    guid: {
        type: String,
        default: () => randomUUID().replace(/\-/g, ""),
        unique: true
    },
    userInfo: {
      type: Object,
      required: true
    }
  },
  {
    timestamps: true,
    collection: "chatRooms"
  }
);

// The statics.
chatRoomSchema.statics.createChatRoom = async function (userInfo) {
  try {
    // if chat room already exists simply return the same room
    // technically should only check the object.keys(userInfo) being present and ignore other fields, but for now this should also work
    const existingChatRoom = await this.findOne({userInfo: userInfo});
    console.log("Existing chat room is ", existingChatRoom);
    if (existingChatRoom) return existingChatRoom;

    const chatRoom = await this.create({ userInfo });
    return chatRoom
  } catch (error) {
    throw error;
  }
};

chatRoomSchema.statics.getHistoryRoomsByUserGuid = async function (userGuid) {
  try {
    /*
    // only want to filter stuff which satisfies: userGuid in Object.keys(userInfo) 
    // currently fetching all rooms from database and then filtering on javascript on server
    const allRooms = await this.find({});
    const filteredRooms = allRooms.filter((e) => {
      return userGuid in e.userInfo;
    });
    */
    // successfully figured out on doing it the efficient way and parse directly form database filtered content
    const filteredRooms = await this.find({ [`userInfo.${userGuid}`]: { $exists: true } });
    return filteredRooms;

  } catch (error) {
    throw error;
  }
}

export default mongoose.model("ChatRoom", chatRoomSchema);