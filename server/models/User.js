import { Schema, model, ObjectId } from "mongoose";

const User = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  emailVerificationString: { type: String, unique: true },
  diskSpace: { type: Number, default: 1024 * 10 * 6 },
  usedSpace: { type: Number, default: 0 },
  avatar: { type: String },
  files: [{ type: ObjectId, ref: "File" }],
});

export default model("User", User);
