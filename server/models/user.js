import { randomUUID } from "crypto";
import mongoose from "mongoose";

export const PRIMARY_LANGUAGES = {
    ENGLISH: "English",
    FRENCH: "French",
    SPANISH: "Spanish",
    GERMAN: "German",
    CHINESE: "Chinese",
    ARABIC: "Arabic",
    HINDI: "Hindi",
};


const userSchema = new mongoose.Schema(
    {
        guid: {
            type: String,
            default: () => randomUUID().replace(/\-/g, ""),
            unique: true
        },
        name: String,
        username: {
            type: String,
            unique: true
        },
        email: {
            type: String,
            unique: true
        },
        primaryLanguage: {
            type: String,
            enum: PRIMARY_LANGUAGES,
        },
    },
    {
        timestamps: true,
        collection: "users",
    }
);

userSchema.statics.createUser = async function (name, username, email, primaryLanguage) {
    try {
        const user = await this.create({ name, username, email, primaryLanguage });
        return user;
    } catch (error) {
        throw error;
    }
};

userSchema.statics.getUsers = async function () {
    try {
        const users = await this.find();
        return users;
    } catch (error) {
        throw error;
    }
};

userSchema.statics.getUserByGuids = async function (givenGuids) {
    try {
        const users = await this.find({ guid: { $in: givenGuids } });
        if (!users) throw ({ error: 'No users found' });
        return users;
    } catch (error) {
        throw error;
    }
};

userSchema.statics.getUserByGuid = async function (givenGuid) {
    try {
        const user = await this.findOne({ guid: givenGuid });
        if (!user) throw ({ error: 'No user found' });
        return user;
    } catch (error) {
        throw error;
    }
};

userSchema.statics.deleteByUserByGuid = async function (givenGuid) {
    try {
        const result = await this.remove({ guid: givenGuid });
        return result;
    } catch (error) {
        throw error;
    }
};

export default mongoose.model("User", userSchema);