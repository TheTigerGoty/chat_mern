import mongoose, { Document, Schema, Types } from "mongoose";
import { UserInterface } from "./user.model";
import { MessageInterface } from "./message.model";

//!----------------------------------------------------------------------------------------!//

interface ConversationInterface extends Document {
    participants: Types.ObjectId[] | UserInterface[];
    messages: Types.ObjectId[] | MessageInterface[];
    createdAt: Date;
    updatedAt: Date;
}

//!----------------------------------------------------------------------------------------!//

const conversationSchema: Schema<ConversationInterface> = new mongoose.Schema(
    {
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        messages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Message',
                default: []
            }
        ]
    },
    { timestamps: true }
);

//!----------------------------------------------------------------------------------------!//

const Conversation = mongoose.model<ConversationInterface>('Conversation', conversationSchema)
export default Conversation