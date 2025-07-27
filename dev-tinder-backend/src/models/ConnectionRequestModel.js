import { Schema, model } from "mongoose";

const ConnectionRequestSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User", // reference to User collection
      required: true,
    },
    recieverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  },
);

ConnectionRequestSchema.index({ senderId: 1, recieverId: 1 });

// ConnectionRequestSchema.pre("save", function(next) {
//     // it will be called everytime before saving the connection request
//     const connectionRequest = this as any;
//     if(connectionRequest?.senderId?.equals(connectionRequest?.recieverId)) {
//         throw new Error("You can't send connection request to yourself");
//     }
//     next();
// });

const ConnectionRequestModel = model(
  "ConnectionRequest",
  ConnectionRequestSchema,
);
export default ConnectionRequestModel;
