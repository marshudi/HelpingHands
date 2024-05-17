import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
    },
});

const UserModel = mongoose.model("UserProfile", UserSchema,"UserProfile");

export default UserModel;
