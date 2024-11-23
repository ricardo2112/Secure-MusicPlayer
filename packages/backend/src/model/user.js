import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    default: null,
  },
  favorites: {
    type: Array,
    default: [],
  },
  lastListened: {
    type: Array,
    default: [],
    max: 10,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
