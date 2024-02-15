import mongoose, { Document, Schema } from "mongoose";

//!----------------------------------------------------------------------------------------!//

export interface UserInterface extends Document {
    fullname: string;
    username: string;
    password: string;
    gender: 'male' | 'female';
    profilePic: string;
}

//!----------------------------------------------------------------------------------------!//

const userSchema: Schema<UserInterface> = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        gender: {
            type: String,
            required: true,
            enum: ['male', 'female']
        },
        profilePic: {
            type: String,
            default: ''
        },
    },
    { timestamps: true }
);

//!----------------------------------------------------------------------------------------!//

const User = mongoose.model<UserInterface>('User', userSchema);
export default User;