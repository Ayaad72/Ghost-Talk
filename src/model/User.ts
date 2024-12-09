// IN THIS FILE WE'VE DEFINED THE USER MODELING
import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}
// Messages Kaa Schema
const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export interface User extends Document {
  userName: String;
  email: String;
  password: String;
  verifyCode: String;
  isVerified: boolean;
  verifyCodeExpiry: Date;
  isAccpetingMessage: Boolean;
  messages: Message[];
}
// User kaa Schema
const UserSchema: Schema<User> = new Schema({
  userName: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please use a valid email address"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  verifyCode: {
    type: String,
    required: [true, "Verify code is required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "Required code expiry is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAccpetingMessage: {
    type: Boolean,
    default: true,
  },
  messages: [MessageSchema],
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("user", UserSchema);

export default UserModel;
