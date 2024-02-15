import mongoose, { Document, Schema, Types } from "mongoose";
import { UserInterface } from "./user.model";

//!----------------------------------------------------------------------------------------!//

export interface MessageInterface extends Document {
    senderId: Types.ObjectId | UserInterface;
    receiverId: Types.ObjectId | UserInterface;
    message: string;
    createdAt: Date;
    updatedAt: Date;
}

//!----------------------------------------------------------------------------------------!//

const messageSchema: Schema<MessageInterface> = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        message: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
)

//!----------------------------------------------------------------------------------------!//

const Message = mongoose.model<MessageInterface>('Message', messageSchema);
export default Message