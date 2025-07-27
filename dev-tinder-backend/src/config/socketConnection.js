import { Server } from "socket.io";
import crypto from "crypto";

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
    socket.on("joinChat", ({ name, userId, targetUserId }) => {
      const roomId = getSecretRoomId(userId, targetUserId);
      socket.join(roomId);
    });

    socket.on("sendMessage", ({ name, userId, targetUserId, newMessage }) => {
      const roomId = getSecretRoomId(userId, targetUserId);
      io.to(roomId).emit("messageReceived", { name, newMessage })
    });

    socket.on("disconnect", () => {});
  });
};
