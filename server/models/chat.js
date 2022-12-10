// const { default: mongoose } = require("mongoose");


const chatSchema = new mongoose.Schema(
{
    message:{
        type:String
    },
    sender: {
        type: String
            }
        },
            {
        timestamps: true
});