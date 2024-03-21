import mongoose from "mongoose";

const documentItem = new mongoose.Schema(
  {
    name: { type: String, required: true },
    reference: { type: String, required: true },
  },
  { _id: false }
);

const userModel = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    role: {
      type: String,
      enum: ["admin", "premium", "user"],
      default: "user",
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    documents: { type: [documentItem], default: [] },
    last_connection: { type: Date, default: new Date() },
    age: { type: Number, required: true },
    cart: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("users", userModel);
