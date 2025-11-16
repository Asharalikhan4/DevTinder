import mongoose, { model, Schema } from "mongoose";

const messageSchema = new Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const ChatSchema = new Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
    ],
    messages: [
      messageSchema
    ]
  },
  {
    timestamps: true,
  },
);

// In model you first pass the name of the model and then you pass the schema.
const ChatModel = model("Chat", ChatSchema);
export default ChatModel;
