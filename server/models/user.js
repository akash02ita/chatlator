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
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        primaryLanguage: {
            type: String,
            enum: PRIMARY_LANGUAGES,
            required: true
        },
    },
    {
        timestamps: true,
        collection: "users",
    }
);

userSchema.statics.createUser = async function (name, email, password, primaryLanguage) {
    try {
        const user = await this.create({ name, email, password, primaryLanguage });
        return user;
    } catch (error) {
        throw error;
    }
};

userSchema.statics.findUser = async function (givenEmail, givenPassword) {
    try {
        const user = await this.findOne({ email: givenEmail, password: givenPassword });
        if (!user) throw ({ error: 'No user found' });
        return user;
    } catch (error) {
        throw error;
    }
};

// userSchema.statics.getUsers = async function () {
//     try {
//         const users = await this.find();
//         return users;
//     } catch (error) {
//         throw error;
//     }
// };

// userSchema.statics.getUserByGuid = async function (givenGuid) {
//     try {
//         const user = await this.findOne({ guid: givenGuid });
//         if (!user) throw ({ error: 'No user found' });
//         return user;
//     } catch (error) {
//         throw error;
//     }
// };

// userSchema.statics.deleteByUserByGuid = async function (givenGuid) {
//     try {
//         const result = await this.remove({ guid: givenGuid });
//         return result;
//     } catch (error) {
//         throw error;
//     }
// };

export default mongoose.model("User", userSchema);