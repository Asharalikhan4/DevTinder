import { Server } from "socket.io";
import crypto from "crypto";
import ChatModel from "../models/ChatModel.js";

const getSecretRoomId = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("$"))
    .digest("hex");
};

export default function socketConnection(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  io.on("connection", (socket) => {
    socket.on("joinChat", ({ userId, targetUserId }) => {
      const roomId = getSecretRoomId(userId, targetUserId);
      socket.join(roomId);
    });

    socket.on("sendMessage", async ({ name, userId, targetUserId, newMessage }) => {
      try {
        const roomId = getSecretRoomId(userId, targetUserId);
        let chat = await ChatModel.findOne({
          participants: { $all: [userId, targetUserId] },
        });
        
        if (!chat) {
          chat = new ChatModel({
            participants: [userId, targetUserId],
            messages: [],
          });
        };

        chat.messages.push({
          senderId: userId,
          message: newMessage,
        });
        
        await chat.save();
        io.to(roomId).emit("messageReceived", { name, newMessage });
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("disconnect", () => {});
  });
};
