import mongoose from "mongoose";

const ticketModel = new mongoose.Schema(
  {
    code: { type: String, unique: true, required: true },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("tickets", ticketModel);
